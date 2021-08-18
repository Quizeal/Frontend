import React, { Fragment } from 'react';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

export default function ToggleButtons(props) {
  const { type } = props;
  const [singleCorrect, setSingleCorrect] = React.useState('');
  const [multiCorrect, setMultiCorrect] = React.useState(() => []);

  const handleSingle = (event, newAlignment) => {
    setSingleCorrect(newAlignment);
  };

  const handleMulti = (event, newFormats) => {
    setMultiCorrect(newFormats);
  };
  return (
    <Fragment>
      {type === 1 ? (
        <ToggleButtonGroup
          value={singleCorrect}
          exclusive
          onChange={handleSingle}
          aria-label='text alignment'
        >
          {props.options.map((o) => (
            <ToggleButton
              value={o.option_name}
              aria-label='left aligned'
              key={o.id}
              onClick={() => props.update(o.option_name, props.qId, 1)}
            >
              {o.option_name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      ) : (
        <ToggleButtonGroup
          value={multiCorrect}
          onChange={handleMulti}
          aria-label='text formatting'
        >
          {props.options.map((o) => (
            <ToggleButton
              value={o.option_name}
              aria-label='left aligned'
              key={o.id}
              onClick={() => props.update(o.option_name, props.qId, 2)}
            >
              {o.option_name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </Fragment>
  );
}
