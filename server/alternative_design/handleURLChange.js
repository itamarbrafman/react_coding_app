const codeBlockService = require('./codeBlockService');
const CheckWhichCase = require('./CheckWhichCase');

async function handleURLChange(socket, clientPort){
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
      mentorId = socket.id;
        console.log('MENTOR_EVENT');
        console.log('mentorId', mentorId);
        return mentorId;
    }

    socket.emit('STUDENT_EVENT');
    console.log('STUDENT_EVENT');
    const documentId = codeBlockService[`${caseType}Id`];
    const existingDocument = await codeBlockService.CodeBlock.findById(documentId);
    const codeFieldValue = existingDocument.code;
    socket.emit('codeBlockChange', { code: codeFieldValue });
    
  }    
};

module.exports = handleURLChange;