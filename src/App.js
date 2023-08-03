import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigations/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Nav /> */}
        <Switch>
          <Route path="/about">about</Route>
          <Route path="/news">news</Route>
          <Route path="/contact">contact</Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*" exact>
            404 Not Found
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
