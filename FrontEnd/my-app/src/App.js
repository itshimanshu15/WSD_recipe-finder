import logo from './logo.png';
import './App.css';
import {Home} from './Home';
import {Category} from './Category';
import {Dish} from './Dish';
import {BrowserRouter, Route, Switch,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <div>
      <img width="100px" height="100px" alt=" " src={logo}/>&nbsp;&nbsp;&nbsp;
      <h3 className="d-inline-flex m-3"> Food Recipe</h3>&nbsp;&nbsp;&nbsp;
      <img width="100px" height="100px" alt=" " src={logo}/>
      </div>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-lg btn-light btn-outline-success" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-lg btn-light btn-outline-success" to="/Category">
              Category
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-lg btn-light btn-outline-success" to="/Dish">
              Dish
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/Category' component={Category}/>
        <Route path='/Dish' component={Dish}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
