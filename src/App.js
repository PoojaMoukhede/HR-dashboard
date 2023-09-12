// import logo from './logo.svg';
import './App.css';
import Main from './Components/Main/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Member from './Pages/Member/Member';
import Managers from './Pages/Member/Managers'
import Attandance from './Pages/Attandance'
import Complaint from './Pages/Complaint'
import { APIContextProvider } from "./Context";
import Details from './Pages/Details';
import PageNotFound from './Components/PageNotFound';
import Expanse from './Pages/Expanse'
import ToastNotification from './Components/ToastNotification';
import FullCalendarComponent from './Components/Updates/FullCalendarComponent';
import Profile from './Components/Header/Profile';


function App() {
  return (
    <>
    <BrowserRouter>
    <APIContextProvider>
        <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/main" element={
           localStorage.getItem("token") ? (
          <Main />
        ) : (<Login/>)}  />
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/members" element={<Member />} />
        <Route exact path="/managers" element={<Managers />} />
        <Route exact path="/attandance" element={<Attandance/>} />
        <Route exact path="/complaint" element={<Complaint/>} />
        <Route exact path="/details" element={<Details/>} />
        <Route exact path='/details' element={<Details/>}/>
        <Route exact path='/expanse' element={<Expanse/>}/>
        <Route exact path='/to' element={<ToastNotification/>}/>
        <Route exact path='*' element={<PageNotFound/>}/>
        <Route exact path='/calender' element={<FullCalendarComponent/>}/>
        {/* <Route exact path='/profile' element={<Profile/>}/> */}
        </Routes>
        </APIContextProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
