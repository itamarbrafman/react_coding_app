const AsyncCaseText = `
  // Simulating an asynchronous function that fetches data from an API
  async function fetchDataFromAPI() {
    try {
      // Simulating an API endpoint
      const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

      // Using the 'await' keyword to pause execution until the promise is resolved
      const response = await fetch(apiUrl);

      // Checking if the response status is OK (200)
      if (!response.ok) {
        throw new Error('Failed to fetch data. Status');
      }

      // Parsing the response JSON
      const data = await response.json();

      // Logging the fetched data
      console.log('Fetched data:', data);
    } catch (error) {
      // Handling errors if any occur during the asynchronous operations
      console.error('Error fetching data:', error.message);
    }
  }

  // Calling the asynchronous function
  fetchDataFromAPI();
`;

const ES6FeaturesText = `
  // Arrow functions
  const add = (a, b) => a + b;

  // Destructuring assignment
  const person = { name: 'John', age: 30, city: 'Example City' };
  const { name, age } = person;

  // Template literals
  const message = 'Hello, {name}! You are {age} years old.';

  // Spread/rest operator
  const numbers = [1, 2, 3, 4, 5];
  const sum = (a, b, ...rest) => {
    const additionalSum = rest.reduce((acc, num) => acc + num, 0);
    return a + b + additionalSum;
  };
  console.log('Sum:', sum(...numbers));
`;

const eventHandlingText = `
  // Simulating an event listener
  document.addEventListener('click', (event) => {
    console.log('Click event:', event);

    // Additional event handling logic can be added here
  });

  // Simulating a custom event and dispatching it
  const customEvent = new CustomEvent('customEvent', { detail: 'Custom event data' });
  document.dispatchEvent(customEvent);
`;

const promiseHandlingText = `
  // Simulating a function that returns a promise
  function simulatePromiseHandling() {
    return new Promise((resolve, reject) => {
      // Simulating asynchronous operations
      setTimeout(() => {
        const success = true; // Set to true for successful promise, false for error simulation

        if (success) {
          resolve('Promise resolved successfully!');
        } else {
          reject(new Error('Promise rejected with an error.'));
        }
      }, 2000);
    });
  }

  // Calling the function and handling the promise
  simulatePromiseHandling()
    .then((result) => {
      console.log('Promise success:', result);
    })
    .catch((error) => {
      console.error('Promise error:', error.message);
    });
`;

export {
  AsyncCaseText,
  ES6FeaturesText,
  eventHandlingText,
  promiseHandlingText,
};
