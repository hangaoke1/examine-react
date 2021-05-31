import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Input } from 'antd';

function TitleInput(props) {
  const { value, onChange, className } = props;
  const [showEdit, setShowEdit] = useState(false);
  return (
    <div
      className={classnames('u-title', className)}
      onClick={() => {
        setShowEdit(true);
      }}
    >
      {showEdit ? (
        <Input
          placeholder="请输入节点名称"
          value={value}
          onChange={onChange}
          onBlur={() => {
            setShowEdit(false);
          }}
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}

TitleInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default TitleInput;
