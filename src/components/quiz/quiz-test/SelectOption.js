import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';

export default function SelectOption(props) {
  const { option_name, is_marked } = props.option;
  return (
    <ToggleButton
      value={option_name}
      selected={is_marked}
      onChange={() => props.update(option_name)}
    >
      {option_name}
    </ToggleButton>
  );
}
