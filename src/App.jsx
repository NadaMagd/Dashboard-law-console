import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import './index.css'; 
import Dashboard from './pages/Dashboard';
import RequestLawyers from './pages/RrguesteLawyers';
import Lawyers from './pages/Lawyers';
import Clients from './pages/Clients';
import ArticlesTable from './pages/ArticlesTable';

function App() {
  return (
    <Router>
      <div className="flex">
  
        <NavBar />

        <div className="ml-64 p-6 w-full min-h-screen bg-franDark text-white">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/request" element={<RequestLawyers />} />
            <Route path="/accepted" element={<Lawyers />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/articles" element={<ArticlesTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
