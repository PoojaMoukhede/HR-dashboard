import logo from './logo.svg';
import './App.css';
import Main from './Components/Main/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<LandingPage />} />
        {/* <Route exact path="/login" element={<Login/>} /> */}
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/main" element={<Main />} />

        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
