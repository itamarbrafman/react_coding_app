import CodeBlock from './components/CodeBlock';
import Home from "./components/home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/:currType',
    element: <CodeBlock />,

  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;

