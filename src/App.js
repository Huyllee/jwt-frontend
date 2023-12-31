import "./App.scss";
import Navbar from "./components/Navigation/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import AppRoutes from "./routes/AppRoutes";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Scrollbars } from "react-custom-scrollbars";

function App() {
  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState();

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, [user]);

  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
      <Router>
        {user && user.isLoading === true ? (
          <div className="loading-container">
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <>
            <div className="app-header">
              <Navbar />
            </div>
            <div className="App">
              <AppRoutes />
            </div>
          </>
        )}
      </Router>

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
    </Scrollbars>
  );
}

export default App;
