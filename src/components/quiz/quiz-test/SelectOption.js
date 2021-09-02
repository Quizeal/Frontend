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
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          {props.options.map((o) => (
            <ToggleButton
              value={o.option_name}
              aria-label='left aligned'
              key={o.id}
              style={{
                borderLeftColor: 'rgba(0, 0, 0, 0.12)',
                textTransform: 'unset',
              }}
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
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          {props.options.map((o) => (
            <ToggleButton
              value={o.option_name}
              aria-label='left aligned'
              key={o.id}
              style={{
                borderLeftColor: 'rgba(0, 0, 0, 0.12)',
                textTransform: 'unset',
              }}
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
