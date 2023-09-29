import "./App.css";

import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Profile from "./components/Profile";
import AdminPage from "./pages/AdminPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import MatchPage from "./pages/MatchPage";
import NotFoundPage from "./pages/NotFoundPage";
import QuestionPage from "./pages/QuestionPage";
import RegistrationPage from "./pages/RegistrationPage";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import SingleQuestionPage from "./pages/SingleQuestionPage";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <div className="App bg-gray-100 dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="match" element={<MatchPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-out" element={<SignOutPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="questions" element={<QuestionPage />} />
          <Route
            path="questions/:questionId"
            element={<SingleQuestionPage />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
