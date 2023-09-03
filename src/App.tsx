import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";

// Pages of the application
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FilesPage from "./pages/FilesPage";
import FileContentPage from "./pages/FileContentPage";

// Middleware checking if a user is logged in or not
import IsAnon from "./middleware/IsAnon";
import IsPrivate from "./middleware/IsPrivate";

// Context
import { AuthProviderWrapper } from "./context/AuthContext";

function App() {
  return (
    <AuthProviderWrapper>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/upload"
              element={
                <IsPrivate>
                  <FilesPage />
                </IsPrivate>
              }
            />
            <Route
              path="/file/:id"
              element={
                <IsPrivate>
                  <FileContentPage />
                </IsPrivate>
              }
            />
            <Route
              path="/login"
              element={
                <IsAnon>
                  <LoginPage />{" "}
                </IsAnon>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProviderWrapper>
  );
}

export default App;
