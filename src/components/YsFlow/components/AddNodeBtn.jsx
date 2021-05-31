import React from 'react';
import { Menu, Dropdown } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function AddNodeBtn(props) {
  const addClick = nodeType => {
    props.onAdd(nodeType);
  };

  const menu = (
    <Menu onClick={e => addClick(e.key)}>
      <Menu.Item key="APPROVAL">审批人</Menu.Item>
      <Menu.Item key="ROUTE">条件分支</Menu.Item>
      <Menu.Item key="ACTION">任务动作</Menu.Item>
    </Menu>
  );
  return (
    <div className="add-node-btn">
      <Dropdown overlay={menu} trigger={['click']} transitionName="">
        <div className="add-node-reference">
          <PlusOutlined />
        </div>
      </Dropdown>
    </div>
  );
}

AddNodeBtn.propTypes = {
  onAdd: PropTypes.func,
};

export default AddNodeBtn;
