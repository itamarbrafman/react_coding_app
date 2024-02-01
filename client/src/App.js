import React, { useEffect, useState } from "react";
import Footer from "./partials/footer";
import Title from "./partials/title";
import Nav from "./partials/nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import {AsyncCaseText, ES6FeaturesText, eventHandlingText, promiseHandlingText} from "./initialTexts.js";
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

const socket = io('http://localhost:5000', {
  query: {
    url: window.location.href,
  },
});

const Home = () => {
  return (
    <div>
      <Title title="Home"/>
      <Nav />
      <Footer />
    </div>
  );
};

const CodeEditor = ({ title, type, initialCode}) => {
  const [codeInput, setCodeInput] = useState(initialCode);
  const [caseFlag, setCaseFlag] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    socket.on("codeBlockChange", ({ code, title }) => {
      setCodeInput(code);
    });
    
    
    return () => {
      socket.disconnect();
    };
  }, []);  
  
  useEffect(() => {
  
    fetch("/save-code-input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput, title: type }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Server----response:");
    })
    .catch((error) => {
      console.error("Error sending code input to server:", error);
    });
  }, [codeInput]);
  

  useEffect(() => {
  
    socket.on('I am a student', () => {
      setCaseFlag(true);
    });  
    
    return () => {
      socket.disconnect();
    };
  }, []); 

  useEffect(() => {
    const highlighted = hljs.highlightAuto(codeInput).value;

    setHighlightedCode(highlighted);
  }, [codeInput]);

  return (
    <div>
      <Nav />
      <h2>{title}</h2>
      <div id="smileyFace">😊</div> {/*for solution, haven't implemented yet*/}
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

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/asyncCase"
          element={<CodeEditor title="Async Case" type="asyncCase" initialCode={AsyncCaseText} />}
        />
        <Route
          path="/promiseHandling"
          element={<CodeEditor title="Promise Handling" type="promiseHandling" initialCode={promiseHandlingText} />}
        />
        <Route
          path="/eventHandling"
          element={<CodeEditor title="Event Handling" type="eventHandling" initialCode={eventHandlingText} />}
        />        
        <Route
        path="/ES6Features"
        element={<CodeEditor title="ES6 Features" type="ES6Features" initialCode={ES6FeaturesText} />}
        />
      </Routes>
    </div>
  );
}

export default App;

