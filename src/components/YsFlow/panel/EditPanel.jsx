import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useUpdate } from 'ahooks';
import { FlowContext } from '../Context';

import { Button, Drawer } from 'antd';
import TitleInput from '../components/TitleInput';

import './EditPanel.less';

function EditPanel(props) {
  const { node, visible, onClose } = props;
  const update = useUpdate();
  const [editNode, setEditNode] = useState(null);
  const flowStore = useContext(FlowContext);

  const hanldeConfirm = () => {
    flowStore.updateNodeData(node.id, editNode.data)
    onClose()
  }

  const handleNodeNameChange = e => {
    const { value } = e.target;
    editNode.data.name = value;
    setEditNode(editNode);
    update();
  };

  useEffect(() => {
    setEditNode(_.cloneDeep(node));
  }, [visible]);

  return (
    <Drawer placement="right" closable={false} onClose={onClose} visible={visible} width={500} bodyStyle={{ padding: 0 }}>
      {editNode && (
        <div className="edit-panel">
          <TitleInput
            className="edit-panel-title"
            value={editNode.data.name}
            onChange={handleNodeNameChange}
          ></TitleInput>
          <div className="edit-panel-content">自定义需要编辑的节点数据</div>
          <div className="edit-panel-footer">
            <Button onClick={onClose} style={{ marginRight: 10 }}>取 消</Button>
            <Button type="primary" onClick={hanldeConfirm}>
              确 定
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
}

EditPanel.propTypes = {
  node: PropTypes.object,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default EditPanel;
