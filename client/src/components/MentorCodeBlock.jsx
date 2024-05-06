const MentorCodeBlock = (codeInput, onChange) => {
    console.log("MentorCodeBlock", codeInput, onChange);  
    return (
      <>
        <div id="smileyFace"></div>
        <textarea
          id="codeInput"
          rows="30"
          cols="160"
          value={codeInput}
          onChange={onChange}
        />
      </>
    );
  };

export default MentorCodeBlock