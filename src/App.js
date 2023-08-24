import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Router>
        <div className="app-header">
          <Nav />
        </div>
        <div className="App">
          <AppRoutes />

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
        </div>
      </Router>
    </>
  );
}

export default App;
