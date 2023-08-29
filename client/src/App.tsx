import './App.css';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Profile from './components/Profile';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import QuestionPage from './pages/QuestionPage';

// import Chat from './components/Chat';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="questions" element={<QuestionPage />} />
                    <Route path="profile" element={<Profile />} />

                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    <Route path="*" element={<ChatPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
