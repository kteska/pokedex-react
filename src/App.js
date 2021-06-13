//import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import PokemonList from './PokemonList';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: 'transparent'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <p variant="h6" className='title__bar'>
            Pokedex
          </p>
        </Toolbar>
      </AppBar>
      <section className="App">
        <Router>
          {/* <Link to="/">Home</Link> */}
          {/* <Link to="/search">Search</Link> */}
          <Route path="/" component={PokemonList} />
          {/* <Route path="/search" component={Search} /> */}
        </Router>
      </section>
    </div>
  );
}

export default App;
