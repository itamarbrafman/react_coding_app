const StudentCodeBlock = (highlightedCode) => {
    return (
      <>
        <div id="smileyFace"></div>
        <pre>
          <code className="styled-code" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      </>
    );
  };

export default StudentCodeBlock;