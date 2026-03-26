import React, { useState } from 'react';
import pb from "../../lib/pocketbase";

interface Props {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Assuming you use the default 'users' collection for admin access
      await pb.collection('users').authWithPassword(email, password);
      onLogin();
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-surface p-8 rounded-xl shadow-sm border border-border w-full max-w-md">
        <h2 className="text-2xl font-bold text-text mb-6 text-center">CMS Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-border rounded bg-background text-text focus:outline-none focus:border-primary"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border border-border rounded bg-background text-text focus:outline-none focus:border-primary"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded font-medium transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}