import './App.css';
import Navbar from './components/NavBar.tsx';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/index.js';
import Admin from './pages/admin.js';
import SelectJobs from './pages/select-jobs.tsx';


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/select-jobs' element={<SelectJobs/>} />
    </Routes>
    </Router>
  );
}

export default App;
