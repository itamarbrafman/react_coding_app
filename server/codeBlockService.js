const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const asyncCaseId = new mongoose.Types.ObjectId();
const promiseHandlingId = new mongoose.Types.ObjectId();
const eventHandlingId = new mongoose.Types.ObjectId();
const ES6FeaturesId = new mongoose.Types.ObjectId();

const CodeBlock = mongoose.model('CodeBlock', codeBlockSchema);

const saveEditedCode = async (_id, { body }, socket) => {
  try {
    const { code, title } = body;

    const result = await CodeBlock.findOneAndUpdate(
      { _id },
      { code, title },
      { upsert: true, new: true }
    );

  } catch (error) {
    console.error('Error saving code:', error);
    socket.emit('connectionError', { error: 'Internal Server Error' });
  }
};

module.exports = {
    CodeBlock,
  asyncCaseId,
  promiseHandlingId,
  eventHandlingId,
  ES6FeaturesId,
  saveEditedCode,
};

