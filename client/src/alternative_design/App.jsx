import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import typeToInfoMap from "./codeBlockService/typeToInfoMap";
import CodeBlockPage from './components/CodeBlock';
import Home from './components/home'; 

function App() {
  return (
    <Router>
      <div>
        <ul>
          {Object.keys(typeToInfoMap).map((type) => (
            <li key={type}>
              <Link to={`/${type}`}>{typeToInfoMap[type].title}</Link>
            </li>
          ))}
        </ul>

        <Routes>
          <Route path="/" element={<Home />} />

          {Object.keys(typeToInfoMap).map((type) => (
            <Route
              key={type}
              path={`/${type}`}
              element={
                <CodeBlockPage
                  type={type}
                  title={typeToInfoMap[type].title}
                  text={typeToInfoMap[type].text}
                  solution={typeToInfoMap[type].solution}
                />
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
