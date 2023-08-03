import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Nav /> */}
        <Switch>
          <Route path="/about">about</Route>
          <Route path="/news">news</Route>
          <Route path="/contact">contact</Route>
          <Route path="/register">
            <Register />
          </Route>
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

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  );
}

export default App;
