import io from "socket.io-client";

const socket = io('http://localhost:5000', {
  //const socket = io('https://backend-6nlo.onrender.com', {
    query: {
      url: window.location.href,
    },
});

export default socket;