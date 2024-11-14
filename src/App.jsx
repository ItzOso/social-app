import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signin from "./pages/auth/Signin";
import AuthRedirect from "./components/auth/AuthRedirect";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />
        <Route
          path="signin"
          element={
            <AuthRedirect>
              <Signin />
            </AuthRedirect>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
