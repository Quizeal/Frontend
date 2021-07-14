import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';

export default function SelectOption(props) {
  const { data, marked } = props.option;
  return (
    <ToggleButton
      value={data}
      selected={marked}
      onChange={() => props.update(data)}
    >
      {data}
    </ToggleButton>
  );
}
