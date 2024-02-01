import React from 'react';

const Block = ({ title, code, setCode }) => {
  return (
    <>
      <h2>{title}</h2>
      <div id="smileyFace">😊</div>
      <textarea
        id="codeInput"
        rows="30"
        cols="160"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
    </>
  );
};

export default Block;


