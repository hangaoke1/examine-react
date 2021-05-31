import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { FlowContext } from '../Context';

import FlowRouteNode from './FlowRouteNode';
import FlowEditNode from '../components/FlowEditNode';

const FlowBranchNode = props => {
  const { node } = props;
  const flowStore = useContext(FlowContext);

  const handleAddBranch = node => {
    flowStore.addBranch(node.id);
  };

  const handleAdd = (node, type) => {
    flowStore.addNext(node.id, type);
  };

  const handleDelete = node => {
    flowStore.deleteNode(node.id);
  };

  const backgroundMap = {
    START: '#a9b4cd',
    END: '#a9b4cd',
    CONDITION: '#52c41a',
    APPROVAL: '#faad14',
    ACTION: '#722ed1',
  };

  return (
    <div className="flow-branch-node">
      <div className="top-line-mask"></div>
      <div className="top-v-line"></div>

      <div className="nodes">
        {node.data.children.map(childNode => {
          if (childNode.type === 'ROUTE') {
            return (
              <FlowRouteNode
                key={childNode.id}
                node={childNode}
                className={childNode.type}
                onAdd={type => {
                  handleAdd(childNode, type);
                }}
                onAddBranch={() => {
                  handleAddBranch(childNode);
                }}
              ></FlowRouteNode>
            );
          } else {
            return (
              <FlowEditNode
                key={childNode.id}
                node={childNode}
                className={childNode.type}
                title={childNode.data.name}
                bgColor={backgroundMap[childNode.type]}
                closeable={!['START', 'END'].includes(childNode.type) && !childNode.data.isDefault}
                onAdd={type => {
                  handleAdd(childNode, type);
                }}
                onDelete={() => {
                  handleDelete(childNode);
                }}
              ></FlowEditNode>
            );
          }
        })}
      </div>

      <div className="bottom-v-line"></div>
      <div className="bottom-line-mask"></div>
    </div>
  );
};

FlowBranchNode.propTypes = {
  node: PropTypes.object,
};

export default observer(FlowBranchNode);
