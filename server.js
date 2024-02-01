const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser

const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const fs = require('fs');
const socketIO = require('socket.io');
const codeBlockService = require('./codeBlockService');
const { Socket } = require('socket.io');

const clientPort = 'http://localhost:3000';

const app = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: clientPort,
  }
});

let mentorSocket = Socket;
app.use(bodyParser.json());

let studentId;
let flagsData = false;

const caseObject = {
  asyncCase: {
    caseType: 'asyncCase',
    flag: false,
    mentorId: null,
  },
  promiseHandling: {
    caseType: 'promiseHandling',
    flag: false,
    mentorId: null,
  },
  eventHandling: {
    caseType: 'eventHandling',
    flag: false,
    mentorId: null,
  },
  ES6Features: {
    caseType: 'ES6Features',
    flag: false,
    mentorId: null,
  },
};
const CheckWhichCase = (caseType) => {
  for (const key in caseObject) {
    if (caseObject.hasOwnProperty(key)) {
      if (caseObject[key].caseType === caseType) {
        return caseObject[key];
      }
    }
  }
  return null;
};

io.on('connection', (socket) => {
  
  console.log('socket.id:', socket.id);
  console.log('flagsData:', flagsData);
  const url = socket.handshake.query.url;
  console.log('Connected client from URL:', url);
  const caseType = url.replace(clientPort + '/', '');
  const currentCase = CheckWhichCase(caseType);
  console.log('currentCase:', currentCase);
  
  if (url !== clientPort + '/') {
    if (!currentCase.flag) {
      currentCase.flag = true;
      currentCase.mentorId = socket.id;
      // mentorSocket = socket;
      // flagsData = true;
      console.log('flag changed!!!!!');   
    }
    else{ 
      socket.emit('I am a student');
      console.log('I am a student emited!!!!!');   

    }
  }  
});

const codeBlockChangeStream = codeBlockService.CodeBlock.watch();

const dbURI = "mongodb+srv://itamarbrafman:8ooqF0HXTDpCdJsv@cluster0.xudn2yd.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Database-connected");
    httpServer.listen(5000);
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
  
app.get("/api/checkFlagsState", (req, res) => {
    console.log("app.get(/api)");
    res.json({flagsData});
});

app.post('/save-code-input', (req, res) => {
  const { code, title } = req.body; 

  const currentCase = CheckWhichCase(title);
  const caseType = currentCase.caseType;
  const caseId = codeBlockService[`${caseType}Id`];
  console.log('caseId:', caseId);
 
  codeBlockService.saveEditedCode(caseId, req, res);
});

codeBlockChangeStream.on('change', async (change) => {
    try {
      const result = await codeBlockService.CodeBlock.findById(change.documentKey);
      if (!result) {
        return res.status(404).json({ error: 'Document not found' });
      }
      
      const codeFieldValue = result.code;
      const titleField = result.title;
      console.log('Change occurred in CodeBlock:', codeFieldValue);
      const currentCase = CheckWhichCase(titleField);
      console.log('currentCase!!!!!!!!!!!!:', currentCase);

      io.to(currentCase.mentorId).emit('codeBlockChange', { code: codeFieldValue, title: titleField });

    } catch (error) {
      console.error('Error retrieving document:', error);
    }
  });
  
