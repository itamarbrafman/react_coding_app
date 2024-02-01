import React, { useEffect, useState } from "react";
import Footer from "./partials/footer";
import Title from "./partials/title";
import Nav from "./partials/nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";

const socket = io('http://localhost:5000', {
  query: {
    url: window.location.href,
  },
});

const Home = () => {
  return (
    <div>
      <Title />
      <Nav />
      <Footer />
    </div>
  );
};

const CodeEditor = ({ title, type }) => {
  const [codeInput, setCodeInput] = useState('testing testing');
  const [caseFlag, setCaseFlag] = useState(false);

  useEffect(() => {
    socket.on("codeBlockChange", ({ code, title }) => {
      console.log('Code block change received:', code, title);
      setCodeInput(code);
    });
    
    
    return () => {
      socket.disconnect();
    };
  }, []);  
  
  useEffect(() => {
    console.log("codeInput:", codeInput);
  
    fetch("/save-code-input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput, title: type }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Server----response:", serverData);
    })
    .catch((error) => {
      console.error("Error sending code input to server:", error);
    });
  }, [codeInput]);
  

  useEffect(() => {
  
    socket.on('I am a student', () => {
      console.log('verified I am a student');
      setCaseFlag(true);
    });  
    
    return () => {
      socket.disconnect();
    };
  }, []); 

  
  return (
    <div>
      <Nav />
      <h2>{title}</h2>
      <div id="smileyFace">😊</div> {/*for solution, haven't implemented yet*/}
      {!caseFlag && (
        <div>{codeInput}</div>
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
          element={<CodeEditor title="Async Case" type="asyncCase" />}
        />
        <Route
          path="/promiseHandling"
          element={<CodeEditor title="Promise Handling" type="promiseHandling" />}
        />
        <Route
          path="/eventHandling"
          element={<CodeEditor title="Event Handling" type="eventHandling" />}
        />        
        <Route
        path="/ES6Features"
        element={<CodeEditor title="ES6 Features" type="ES6Features" />}
        />
      </Routes>
    </div>
  );
}

export default App;

