import React, { useEffect, useState } from "react";
import Footer from "./partials/footer";
import Title from "./partials/title";
import Nav from "./partials/nav";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import io from "socket.io-client";
import {asyncCaseText, ES6FeaturesText, eventHandlingText, promiseHandlingText} from "./initialTexts.js";
import {asyncCaseSolution, ES6FeaturesSolution, eventHandlingSolution, promiseHandlingSolution} from "./solutions.js";
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

const socket = io('https://backend-coding-app.onrender.com', {
  query: {
    url: window.location.href,
  },
});

const typeToTitleMap = {
  asyncCase: "Async Case",
  promiseHandling: "Promise Handling",
  eventHandling: "Event Handling",
  ES6Features: "ES6 Features",
};

const typeToTextMap = {
  asyncCase: asyncCaseText,
  promiseHandling: promiseHandlingText,
  eventHandling: eventHandlingText,
  ES6Features: ES6FeaturesText,
};

const typeToSolutionMap = {
  asyncCase: asyncCaseSolution,
  promiseHandling: promiseHandlingSolution,
  eventHandling: eventHandlingSolution,
  ES6Features: ES6FeaturesSolution,
};

const Home = () => {
  return (
    <div>
      <Title title="Home"/>
      <Nav />
      <Footer />
    </div>
  );
};

const CodeEditor = () => {
  const { currType } = useParams();
  
  const title = typeToTitleMap[currType];
  const type = currType;
  const initialCode = typeToTextMap[currType];
  const solution = typeToSolutionMap[currType];

  const [codeInput, setCodeInput] = useState(initialCode);
  const [caseFlag, setCaseFlag] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');
  

  useEffect(() => {
    socket.on("codeBlockChange", ({ code, title }) => {
      setCodeInput(code);
    });
    
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
  
    socket.on('STUDENT_EVENT', () => {
      setCaseFlag(true);
    });  
    
  }, []);  

  useEffect(() => {
    const highlighted = hljs.highlightAuto(codeInput).value;

    setHighlightedCode(highlighted);
  }, [codeInput]);

  return (
    <div>
      <Nav />
      <h2>{title}</h2>
      <div id="smileyFace" style={{ display: solution === initialCode ? 'block' : 'none' }}>😊</div>
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
          <Route path="http://localhost:3000/" element={<Home />} />
          <Route
            path= {"http://localhost:3000/:currType"}
            element={<CodeEditor />}
          />
        </Routes>
    </div>
  );
};

export default App;

