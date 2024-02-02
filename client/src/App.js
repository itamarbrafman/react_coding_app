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

const socket = io('https://backend-6nlo.onrender.com', {
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
  
    socket.on('STUDENT_EVENT', () => {
      setCaseFlag(true);
    });  
    
  }, []);  

  useEffect(() => {
    // Emit saveCodeInput event to the server
    socket.emit('saveCodeInput', { code: codeInput, title: type });

    // Optional: Handle the server's response if needed
    socket.on('saveCodeInputResponse', (data) => {
      console.log('Server response:', data);
    });
  }, [codeInput, type]);

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
          <Route path="/" element={<Home />} />
          <Route
            path= {"/:currType"}
            element={<CodeEditor />}
          />
        </Routes>
    </div>
  );
};

export default App;

