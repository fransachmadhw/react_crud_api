import {} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Update from './components/Update';
import Read from './components/Read';
import ToasterProvider from './components/ToasterProvider';

function App() {
  return (
    <>
      <ToasterProvider />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/read/:id" element={<Read />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
