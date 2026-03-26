import { useState, useEffect } from 'react';
import pb from '../lib/pocketbase';
import LoginForm from './components/LoginForm';
import CollectionFeed from './components/CollectionFeed';
import { adminCollections } from './config';
import { LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState(adminCollections[0].id);

  // Check auth state on mount
  useEffect(() => {
    setIsLoggedIn(pb.authStore.isValid);
  }, []);

  const handleLogout = () => {
    pb.authStore.clear();
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[var(--admin-color-background)] p-4 font-sans">
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  const activeConfig = adminCollections.find(c => c.id === activeTab)!;

  return (
    <div className="min-h-screen bg-[var(--admin-color-background)] font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[var(--admin-color-surface)] border-r border-[var(--admin-color-border)] p-4 flex flex-col gap-2">
        <div className="mb-6 px-2">
          <h1 className="text-xl font-bold text-[var(--admin-color-text)]">CMS Manager</h1>
        </div>
        
        <nav className="flex-1 space-y-1 flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          {adminCollections.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveTab(col.id)}
              className={`flex-shrink-0 md:w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === col.id 
                  ? 'bg-[var(--admin-color-primary)] text-white' 
                  : 'text-[var(--admin-color-muted)] hover:bg-[var(--admin-color-background)] hover:text-[var(--admin-color-text)]'
              }`}
            >
              {col.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2 text-[var(--admin-color-muted)] hover:text-red-500 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="mb-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--admin-color-text)]">{activeConfig.label}</h2>
          <p className="text-[var(--admin-color-muted)] text-sm">Create and manage your {activeConfig.label.toLowerCase()} entries.</p>
        </div>
        
        {/* Pass a key so React completely remounts the component when switching tabs */}
        <CollectionFeed key={activeTab} config={activeConfig} />
      </main>
      
    </div>
  );
}