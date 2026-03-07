import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="page-shell">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-4 md:px-8 lg:px-10">
        <Navbar />
        <main className="mt-6 flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <footer className="mt-10 border-t border-slate-800/80 pt-4 text-xs text-slate-500">
          <p>
            AI Resume Analyzer &mdash; Designed like a modern SaaS dashboard.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

