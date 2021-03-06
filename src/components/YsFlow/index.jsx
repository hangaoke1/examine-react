import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useReactive } from 'ahooks';
import eventbus from '@/lib/eventbus';
import FlowEditorStore from '@/lib/flow';
import { FlowContext } from './Context';

import { Button, Modal } from 'antd';
import MonacoEditor from 'react-monaco-editor';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import FlowBranchNode from './nodes/FlowBranchNode';
import EditPanel from './panel/EditPanel';

import './index.less';

const YsFlow = observer(() => {
  const [flowStore, setFlowStore] = useState(null);

  const state = useReactive({
    scale: 1, // 缩放尺寸
    showEdit: false,
    editNode: null, // 编辑节点
    showXml: false,
    xmlContent: '',
    showJson: false,
    jsonContent: '',
  });

  /**
   * 预览xml
   */
  const previewXML = () => {
    state.showXml = true;
    state.xmlContent = flowStore.buildXML();
  };

  /**
   * 预览json
   */
  const previewJSON = () => {
    state.showJson = true;
    state.jsonContent = JSON.stringify(toJS(flowStore.rootNode), null, 2);
  };

  /**
   * 编辑节点
   */
  const handleNodeClick = node => {
    state.editNode = node;
    state.showEdit = true;
  };

  /**
   * 缩放布局
   * @param {string} type minus | plus
   */
  const handleScaleClick = type => {
    if (type === 'minus') {
      state.scale = state.scale - 0.1;
    } else if (type === 'plus') {
      state.scale = state.scale + 0.1;
    }
  };

  useEffect(() => {
    const flowStore = new FlowEditorStore();
    setFlowStore(flowStore);
    window.flowStore = flowStore;
    eventbus.on('node_click', handleNodeClick);
    return () => {
      eventbus.off('node_click', handleNodeClick);
    };
  }, []);

  const scaleStyle = {
    transform: `scale(${state.scale})`,
  };

  return (
    <FlowContext.Provider value={flowStore}>
      <div className="flow-editor">
        {/* 工具条 */}
        <div className="flow-editor-toolbar">
          <Button style={{ padding: '4px 5px'}} type="link" onClick={previewJSON}>
            查看json数据
          </Button>
          <Button style={{ padding: '4px 5px'}} type="link" onClick={previewXML}>
            查看xml数据
          </Button>
          <Button
            icon={<MinusOutlined />}
            disabled={state.scale <= 0.5}
            size="small"
            onClick={() => handleScaleClick('minus')}
          />
          <span className="flow-editor-toolbar__scale">{(state.scale * 100).toFixed(0)}%</span>
          <Button
            icon={<PlusOutlined />}
            disabled={state.scale > 3}
            size="small"
            onClick={() => handleScaleClick('plus')}
          />
        </div>

        {/* 审批流主体 */}
        <div className="flow-editor-view" style={scaleStyle}>
          {flowStore && <FlowBranchNode node={flowStore.rootNode}></FlowBranchNode>}
        </div>

        <EditPanel
          visible={state.showEdit}
          node={state.editNode}
          onClose={() => {
            state.showEdit = false;
          }}
        ></EditPanel>

        <Modal
          title="XML数据预览"
          visible={state.showXml}
          width="1000px"
          height="600px"
          onOk={() => {
            state.showXml = false;
          }}
          onCancel={() => {
            state.showXml = false;
          }}
        >
          <MonacoEditor
            width="950"
            height="600"
            language="xml"
            theme="vs-dark"
            value={state.xmlContent}
          />
        </Modal>

        <Modal
          title="JSON数据预览"
          visible={state.showJson}
          width="1000px"
          height="600px"
          onOk={() => {
            state.showJson = false;
          }}
          onCancel={() => {
            state.showJson = false;
          }}
        >
          <MonacoEditor
            width="950"
            height="600"
            language="json"
            theme="vs-dark"
            value={state.jsonContent}
          />
        </Modal>
      </div>
    </FlowContext.Provider>
  );
});

export default YsFlow;
