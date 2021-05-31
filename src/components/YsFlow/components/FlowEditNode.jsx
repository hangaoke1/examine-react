import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import eventbus from '@/lib/eventbus';

import { Button } from 'antd';
import AddNodeBtn from './AddNodeBtn';

function FlowEditNode(props) {
  const {
    node,
    title,
    content,
    placeholder = '请配置节点内容',
    closeable = true,
    bgColor = '#1890ff',
    titleColor = '#fff',
  } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const nodeClick = () => {
    if (node) {
      eventbus.emit('node_click', node);
    }
  };

  const handleAdd = type => {
    if (props.onAdd) {
      props.onAdd(type);
    }
  };

  const deleteClick = () => {
    setShowDeleteModal(true);
  };

  const deleteConfirm = () => {
    if (props.onDelete) {
      props.onDelete();
    }
    setShowDeleteModal(false);
  };

  const deleteCancel = () => {
    setShowDeleteModal(false);
  };
  return (
    <div className="flow-editor-node">
      <div
        className="flow-editor-node-container"
        style={{ background: bgColor }}
        onClick={nodeClick}
      >
        {/* 节点标题 */}
        <div className="node-title" style={{ color: titleColor }}>
          <span>{title}</span>
        </div>

        {/* 节点内容 */}
        <div className="node-content">
          {content ? (
            <div className="node-content__inner">{content}</div>
          ) : (
            <div className="node-content__inner node-content__placeholder">{placeholder}</div>
          )}
        </div>

        {/* 默认插槽 */}
        {props.children}

        {/* 节点删除 */}
        {closeable && <CloseOutlined className="close-btn" onClick={deleteClick} />}

        {showDeleteModal && (
          <div className="close-modal">
            <Button size="small" onClick={deleteCancel}>
              取消
            </Button>
            <Button size="small" type="primary" danger onClick={deleteConfirm}>
              删除
            </Button>
          </div>
        )}

        {/* 错误提示 */}
        {node.isError && <i className="el-icon-warning"></i>}
      </div>

      {node.type !== 'END' && (
        <>
          <div className="v-line"></div>
          <AddNodeBtn onAdd={handleAdd}></AddNodeBtn>
        </>
      )}
    </div>
  );
}

FlowEditNode.propTypes = {
  node: PropTypes.object, // 节点数据
  title: PropTypes.string, // 节点标题
  content: PropTypes.string, // 节点展示内容
  placeholder: PropTypes.string, // 节点提示内容
  closeable: PropTypes.bool, // 节点是否可删除
  bgColor: PropTypes.string, // 节点颜色
  titleColor: PropTypes.string, // 节点标题颜色
};

export default FlowEditNode;
