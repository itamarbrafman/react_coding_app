const caseObject = {
  asyncCase: {
    caseType: 'asyncCase',
    mentorId: null,
  },
  promiseHandling: {
    caseType: 'promiseHandling',
    mentorId: null,
  },
  eventHandling: {
    caseType: 'eventHandling',
    mentorId: null,
  },
  ES6Features: {
    caseType: 'ES6Features',
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

module.exports = CheckWhichCase;
