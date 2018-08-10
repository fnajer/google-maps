import React, { Component } from 'react';

const MarkerInput = () => {
  return (
    <input
      className="w-100"
      type="text" 
      placeholder="New point of routes" 
      style={{ border: '2px solid #000', padding: '5px 10px' }} />
  );
};

export default MarkerInput;