import './App.css';

import React from 'react';

import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage';

// import Chat from './components/Chat';

function App() {
    return (
        <div className="App">
            {/* <Chat /> */}
            <Navbar />
            <ChatPage />
        </div>
    );
}

export default App;
