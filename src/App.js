//import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <section className="App">
    <Router>
      {/* <Link to="/">Home</Link> */}
      {/* <Link to="/search">Search</Link> */}
      <Route path="/" component={Home} />
      {/* <Route path="/search" component={Search} /> */}
    </Router>
  </section>
    </div>
  );
}

export default App;
