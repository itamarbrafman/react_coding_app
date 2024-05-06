const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const codeBlockService = require('./codeBlockService');
const CheckWhichCase = require('./checkWhichCase');
// const clientPort = 'https://frontend-coding.onrender.com';
const clientPort = 'http://localhost:3000';

const app = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: clientPort,
  }
});

const codeBlockChangeStream = codeBlockService.CodeBlock.watch();
const dbURI = "mongodb+srv://itamarbrafman:8ooqF0HXTDpCdJsv@cluster0.xudn2yd.mongodb.net/?retryWrites=true&w=majority";

io.on('connection', async (socket) => {
  const url = socket.handshake.query.url;
  const caseType = url.replace(clientPort + '/', '');
  const currentCase = CheckWhichCase(caseType);
  console.log('currentCase', currentCase);
  console.log('url', url);
  
  if (url !== clientPort + '/') {
    if (!currentCase) {
      socket.emit('connectionError', { error: 'Page not found' });
      socket.disconnect(true);
      return;
    }

    if (!currentCase.flag) {
      currentCase.flag = true;
      currentCase.mentorId = socket.id;

    } else {

      socket.emit('STUDENT_EVENT');

      const documentId = codeBlockService[`${caseType}Id`];
      const existingDocument = await codeBlockService.CodeBlock.findById(documentId);
      const codeFieldValue = existingDocument.code;
      socket.emit('codeBlockChange', { code: codeFieldValue });
    }
  }  

  socket.on('saveCodeInput', ({ code, title }) => {
    try {
      const currentCase = CheckWhichCase(title);
      const caseType = currentCase.caseType;
      const caseId = codeBlockService[`${caseType}Id`];

      codeBlockService.saveEditedCode(caseId, { body: { code, title } }, socket);

      socket.emit('saveCodeInputResponse');
    } catch (error) {
      console.error('Error saving code:', error);    
    }
  });    
});

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Database-connected");
    httpServer.listen(5000);
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

  

codeBlockChangeStream.on('change', async (change) => {
    try {
      const result = await codeBlockService.CodeBlock.findById(change.documentKey);

      const codeFieldValue = result.code;
      const titleField = result.title;
      const currentCase = CheckWhichCase(titleField);

      io.to(currentCase.mentorId).emit('codeBlockChange', { code: codeFieldValue, title: titleField });

    } catch (error) {
      console.error('Error retrieving document:', error);
    }
  });
  
