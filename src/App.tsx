import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import Analytics from './pages/Analytics';
import Workspace from './pages/Workspace';
import News from './pages/News';
import Projects from './pages/Projects';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'analytics':
        return <Analytics />;
      case 'workspace':
        return <Workspace />;
      case 'news':
        return <News />;
      case 'projects':
        return <Projects />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
