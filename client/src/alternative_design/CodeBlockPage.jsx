import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import StudentCodeBlockPage from './StudentCodeBlockPage'; // Assuming StudentCodeBlockPage and MentorCodeBlockPage are defined
import MentorCodeBlockPage from './MentorCodeBlockPage';

function CodeBlockPage({ type, title, text, solution }) {
  const [isStudent, setIsStudent] = useState(false); 
  const [socket, setSocket] = useState(null);
  const [initialCode, setInitialCode] = useState(text);

  useEffect(() => {
    console.log('Connecting socket...');
    const newSocket = io("http://localhost:5000");

    newSocket.on('connectionError', ({ error }) => {
      console.error('Connection Error:', error);  
    });

    newSocket.on('USER_EVENT_RESPONSE', (data) => {
      const { event, code } = data;
      console.log('Received USER_EVENT_RESPONSE:', event);
        setIsStudent(event === 'student');
        setInitialCode(code || text);
    });

    setSocket(newSocket);

    return () => {
      console.log('Disconnecting socket...');
      newSocket.disconnect();
    };
  }, [text]);

  const renderCodeBlock = () => {
    if (isStudent) {
      return <StudentCodeBlockPage title={title} text={text} solution={solution} initialCode={initialCode} socket={socket} />;
    } else {
      return <MentorCodeBlockPage title={title} text={text} solution={solution} initialCode={initialCode} socket={socket} />;
    }
  };

  return (
    <>
      {renderCodeBlock()}
    </>
  );
}

export default CodeBlockPage;
