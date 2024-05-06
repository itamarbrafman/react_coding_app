import io from "socket.io-client";

// const socket = io('https://backend-6nlo.onrender.com', {
  const socket = io('http://localhost:5000', {
    query: {
      url: window.location.href,
    },
});
console.log("socket", socket);

export default socket;