import React from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import RankHall from "./pages/RankHall";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import QuizTest from "./pages/QuizTest";
import GameRules from "./pages/GameRules";
import AboutUs from "./pages/AboutUs";
import Legal from "./pages/Legal";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                  <Home />
              }
            />
            <Route
              path="/rank-hall"
              element={
                <PrivateRoute>
                  <RankHall />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz-test"
              element={
                <PrivateRoute>
                  <QuizTest />
                </PrivateRoute>
              }
            />
            <Route
              path="/information/how-to-play"
              element={
                <PrivateRoute>
                  <GameRules />
                </PrivateRoute>
              }
            />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/company/about-us" element={<AboutUs />} />
            <Route path="/company/legal" element={<Legal />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
