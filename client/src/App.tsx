import './App.css';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Profile from './components/Profile';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import MatchPage from './pages/MatchPage';
import NotFoundPage from './pages/NotFoundPage';
import QuestionPage from './pages/QuestionPage';
import SingleQuestionPage from './pages/SingleQuestionPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/match" element={<MatchPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="questions" element={<QuestionPage />} />
                    <Route path="questions/:questionId" element={<SingleQuestionPage />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
