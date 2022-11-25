import './App.css';
import JobPicker from './components/JobPicker.tsx'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>North House Jobs</h1>
        <JobPicker cycle="2022-11-27-Cycle"/>
      </header>
    </div>
  );
}

export default App;
