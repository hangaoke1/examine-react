import React, { useMemo, useContext } from 'react';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { FlowContext } from '../Context';
import FlowEditNode from '../components/FlowEditNode';

function FlowConditionNode(props) {
  const { branchIndex, branchCount, ...restProps } = props;
  const flowStore = useContext(FlowContext);
  const showLeftMove = useMemo(() => {
    if (branchIndex === branchCount - 1) {
      return false;
    } else if (branchIndex > 0) {
      return true;
    }
    return false;
  }, [branchIndex, branchCount]);

  const showRightMove = useMemo(() => {
    if (branchIndex === branchCount - 1) {
      return false;
    } else if (branchIndex < branchCount - 2) {
      return true;
    }
    return false;
  }, [branchIndex, branchCount]);

  const moveToleft = e => {
    e.stopPropagation();
    flowStore.moveCondition(props.node.id, branchIndex - 1);
  };

  const moveToRight = e => {
    e.stopPropagation();
    flowStore.moveCondition(props.node.id, branchIndex + 1);
  };

  return (
    <FlowEditNode {...restProps}>
      {showLeftMove && <CaretLeftOutlined className="arrow-left" onClick={moveToleft} />}
      {showRightMove && <CaretRightOutlined className="arrow-right" onClick={moveToRight} />}
    </FlowEditNode>
  );
}

FlowConditionNode.propTypes = {
  branchIndex: PropTypes.number,
  branchCount: PropTypes.number,
};

export default FlowConditionNode;
