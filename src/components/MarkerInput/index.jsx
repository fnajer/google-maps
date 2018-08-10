import React, { Component } from 'react';

const MarkerInput = ({ cords, handleInputChange, handleInputSumbit }) => {
  return (
    <form onSubmit={handleInputSumbit}>
      <input
        value={cords}
        onChange={handleInputChange}
        className="w-100"
        type="text" 
        placeholder="New point of routes" 
        style={{ border: '2px solid #000', padding: '5px 10px' }} />
    </form>
  );
};

export default MarkerInput;