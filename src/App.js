import './App.css';
import Navbar from './components/NavBar.tsx';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/index.tsx';
import Admin from './pages/admin.tsx';
import SelectJobs from './pages/select-jobs.tsx';
import { initializeApp, FirebaseApp } from "firebase/app";


function App() {
  // See: https://firebase.google.com/docs/web/learn-more#config-object
  const firebaseConfig = {
    apiKey: "AIzaSyBAYZyW1jzOMRjMPvl3sCIdP2N-X48IaUE",
    authDomain: "eph-jobs-tracker.firebaseapp.com",
    databaseURL: "https://eph-jobs-tracker-default-rtdb.firebaseio.com",
    projectId: "eph-jobs-tracker",
    storageBucket: "eph-jobs-tracker.appspot.com",
    messagingSenderId: "7092215163",
    appId: "1:7092215163:web:9125a49de5af8707c131de",
    measurementId: "G-MM1D1YCSHF"
  };

  // Initialize Firebase
  let app = initializeApp(firebaseConfig);
  
  return (
    <Router>
    <Navbar app={app}/>
    <Routes>
        <Route path='/' element={<Home app={app}/>} />
        <Route path='/admin' element={<Admin app={app}/>} />
        <Route path='/select-jobs' element={<SelectJobs app={app}/>} />
    </Routes>
    </Router>
  );
}

export default App;
