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

module.exports = CheckWhichCase;