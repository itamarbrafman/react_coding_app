import {asyncCaseText, ES6FeaturesText, eventHandlingText, promiseHandlingText} from "./initialTexts.js";
import {asyncCaseSolution, ES6FeaturesSolution, eventHandlingSolution, promiseHandlingSolution} from "./solutions.js";

const typeToInfoMap = {
  asyncCase: {
    title: "Async Case",
    text: asyncCaseText,
    solution: asyncCaseSolution,
  },
  promiseHandling: {
    title: "Promise Handling",
    text: promiseHandlingText,
    solution: promiseHandlingSolution,
  },
  eventHandling: {
    title: "Event Handling",
    text: eventHandlingText,
    solution: eventHandlingSolution,
  },
  ES6Features: {
    title: "ES6 Features",
    text: ES6FeaturesText,
    solution: ES6FeaturesSolution,
  },
};

export default typeToInfoMap;