import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import AddNodeBtn from '../components/AddNodeBtn';
import FlowBranchNode from './FlowBranchNode';

function FlowRouteNode(props) {
  const { node, onAddBranch, onAdd } = props;
  return (
    <div className="flow-route-node">
      <div className="top-h-line"></div>
      <div className="add-branch-btn" onClick={onAddBranch}>
        添加条件
      </div>
      <div className="branchs">
        {node.data.children.map((item, index) => {
          return (
            <FlowBranchNode
              key={item.id}
              node={item}
              routeNode={node}
              branchIndex={index}
              branchCount={node.data.children.length}
            ></FlowBranchNode>
          );
        })}
      </div>
      <div className="bottom-h-line"></div>
      <div className="v-line"></div>

      <AddNodeBtn onAdd={onAdd}></AddNodeBtn>
    </div>
  );
}

FlowRouteNode.propTypes = {
  node: PropTypes.object,
};

export default observer(FlowRouteNode);
