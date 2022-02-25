import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This will be the login page. You can log in or enter as guest.
          Next step is to get the link to the pixi page working.
        </p>
        <div>
        <Router>
            <Routes>
              <Route exact path="/" component={App} />
              <Route path="/Game.html" component={<Game></Game>} />
            </Routes>
          </Router>
        </div>

    
      </header>
      <div>

      </div>
    </div>
  );
}

function Game() {
  return (
      <div>
         <Link to="Game.html">Components</Link>
      </div>
   );
  }

export default App;
