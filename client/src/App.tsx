import "./App.css";

import * as Sentry from "@sentry/react";
import React, { useContext } from "react";
import {
  createRoutesFromChildren,
  matchRoutes,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import Layout from "./components/Layout";
import Notifications from "./components/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/FirebaseAuthContext";
import AdminPage from "./pages/AdminPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import MatchPage from "./pages/MatchPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import QuestionPage from "./pages/QuestionPage";
import QuestionUpdatePage from "./pages/QuestionUpdatePage";
import RegistrationPage from "./pages/RegistrationPage";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import SingleQuestionPage from "./pages/SingleQuestionPage";

Sentry.init({
  dsn: "https://e21ba66ad7a580aa7874699b6d737245@o1071968.ingest.sentry.io/4505986992832512",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="App bg-gray-100 dark:bg-gray-800">
      <SentryRoutes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LandingPage />} />
          <Route
            path="match"
            element={
              <ProtectedRoute user={currentUser} permissionRole="user">
                <MatchPage />
              </ProtectedRoute>
            }
          />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-out" element={<SignOutPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="questions" element={<QuestionPage />} />
          <Route
            path="questions/:questionId"
            element={
              <ProtectedRoute user={currentUser} permissionRole="user">
                <SingleQuestionPage />
              </ProtectedRoute>
            }
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={currentUser} permissionRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<AdminPage />} />
          <Route path="question/:id/update" element={<QuestionUpdatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </SentryRoutes>
      <Notifications />
    </div>
  );
}

export default App;
