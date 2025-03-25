import logo from './TF.png';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from
'react-router-dom';
 
function App() {
  return (
    <div className="App">
    <NavBar/>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Gerenciador de Tarefas e Relatórios para TO
        </p>
      
    </div>
  );
}
 
export default App;