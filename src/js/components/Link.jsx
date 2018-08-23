import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ active, children }) => (
  <button
    type="button"
    disabled={active}
    style={{
      marginLeft: '4px',
    }}
  >
    {children}
  </button>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
