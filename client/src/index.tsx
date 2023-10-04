import "./index.css";

import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import App from "./App";
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider } from "./context/FirebaseAuthContext";
import { MatchingProvider } from "./context/MatchingContext";
import reportWebVitals from "./reportWebVitals";

Sentry.init({
  dsn: "https://e21ba66ad7a580aa7874699b6d737245@o1071968.ingest.sentry.io/4505986992832512",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <SentryRoutes>
      <BrowserRouter>
        <AuthProvider>
          <MatchingProvider>
            <DarkModeProvider>
              <App />
            </DarkModeProvider>
          </MatchingProvider>
        </AuthProvider>
      </BrowserRouter>
    </SentryRoutes>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
