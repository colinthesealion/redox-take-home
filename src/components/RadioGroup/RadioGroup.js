import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = ({ input, options }) => {
  return (
    <span>
      {options.map((option) => {
        return (
          <label htmlFor={option} key={option}>
            {option}
            <input
              id={option}
              name={input.name}
              type="radio"
              value={option}
              checked={option === input.value}
              onChange={input.onChange}
            />
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
