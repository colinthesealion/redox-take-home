import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import './radio-group.scss';

const classes = new BEMHelper({ name: 'radio-group' });

const RadioGroup = ({ input, options, required }) => {
  return (
    <span {...classes({ element: 'body' })}>
      {options.map((option) => {
        return (
          <label htmlFor={option} key={option} {...classes({ element: 'label' })}>
            <input
              id={option}
              name={input.name}
              type="radio"
              value={option}
              checked={option === input.value}
              onChange={input.onChange}
              required={required}
            />
            {option}
          </label>
        );
      })}
    </span>
  );
};
RadioGroup.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RadioGroup;
