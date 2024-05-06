import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';
import Footer from "./partials/footer";
import Nav from "./partials/nav";
import io from "socket.io-client";
import typeToInfoMap from "../codeBlockService/typeToInfoMap";

let socket;
const CodeBlock = () => {
  const { currType } = useParams();
  const type = currType;
  const { title, text: initialCode, solution } = typeToInfoMap[type];

  const [codeInput, setCodeInput] = useState(initialCode);
  const [isStudent, setIsStudent] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    socket = io("http://localhost:5000", {
      query: {
        url: window.location.href,
      },
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);


  useEffect(() => {
    socket.on('connectionError', ({ error }) => {
      console.error('Connection Error:', error);  
    });

    return () => {
      socket.off('connectionError');
    };
  }, []); 


  useEffect(() => {
    const handleStudentEvent = () => {
      setIsStudent(true);
    };
  
    socket.on('STUDENT_EVENT', handleStudentEvent);
  
    return () => {
      socket.off('STUDENT_EVENT', handleStudentEvent);
    };
  }, []);  
  

  useEffect(() => {
    const handleCodeBlockChange = ({ code }) => {
      setCodeInput(code);
    };
  
    socket.on("codeBlockChange", handleCodeBlockChange);
  
    return () => {
      socket.off("codeBlockChange", handleCodeBlockChange);
    };
  }, []);
  

  useEffect(() => {
    socket.emit('saveCodeInput', { code: codeInput, title: type });

  }, [codeInput]);


  useEffect(() => {
    const highlighted = hljs.highlightAuto(codeInput).value;

    setHighlightedCode(highlighted);
  }, [codeInput]);
  
  return (
    <>
      <Nav />
      <h2>{title}</h2>
      <div id="smileyFace">{solution === codeInput && '😊'}</div>
      {!isStudent && (
        <pre>
          <code className="styled-code" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      )}
      {isStudent && (
        <textarea
          id="codeInput"
          rows="30"
          cols="160"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
        ></textarea>
      )}
      <Footer />
    </>
  );
};

export default CodeBlock;
