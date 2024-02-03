import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';
import Home from "./components/home";
import Footer from "./components/partials/footer";
import Nav from "./components/partials/nav";
import socket from "./socket.js";
import typeToInfoMap from "./codeBlockService/typeToInfoMap";

const CodeBlock = () => {
  const { currType } = useParams();
  
  const type = currType;
  const { title, text: initialCode, solution } = typeToInfoMap[type];

  const [codeInput, setCodeInput] = useState(initialCode);
  const [caseFlag, setCaseFlag] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    socket.on('connectionError', ({ error }) => {
      console.error('Connection Error:', error);  
    });

    return () => {
      socket.off('connectionError');
    };
  }, []); 

  useEffect(() => {
  
    socket.on('STUDENT_EVENT', () => {
      setCaseFlag(true);
    });  
    
  }, []);  

  useEffect(() => {
    socket.on("codeBlockChange", ({ code }) => {
      setCodeInput(code);
    });
    
  }, []);  


  useEffect(() => {
    socket.emit('saveCodeInput', { code: codeInput, title: type });

  }, [codeInput]);

  useEffect(() => {
    const highlighted = hljs.highlightAuto(codeInput).value;

    setHighlightedCode(highlighted);
  }, [codeInput]);

  useEffect(() => {
    const shouldDisplaySmileyFace = solution === codeInput;
    const smileyFaceElement = document.getElementById('smileyFace');
    if (smileyFaceElement) {
      smileyFaceElement.style.display = shouldDisplaySmileyFace ? 'block' : 'none';
    }
  }, [codeInput]);
  
  return (
    <div>
      <Nav />
      <h2>{title}</h2>
      <div id="smileyFace">😊</div>
      {!caseFlag && (
        <pre>
          <code className="styled-code" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      )}
      {caseFlag && (
        <textarea
          id="codeInput"
          rows="30"
          cols="160"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
        ></textarea>
      )}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path= {"/:currType"}
            element={<CodeBlock />}
          />
        </Routes>
    </div>
  );
};

export default App;

