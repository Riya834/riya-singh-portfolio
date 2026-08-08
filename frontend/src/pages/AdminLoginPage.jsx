import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Shield, ArrowLeft, AlertCircle } from 'lucide-react';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('riyarssingh22@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-electric/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-brand-muted hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-brand-electric" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Login Card */}
        <div className="glass-panel rounded-3xl p-8 border border-brand-border/80 shadow-2xl bg-brand-bg">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-brand-electric/10 border border-brand-electric/40 flex items-center justify-center text-brand-electric mx-auto mb-3 shadow-electric">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-white">Admin CMS Access</h1>
            <p className="font-mono text-xs text-brand-muted mt-1">Authenticating Riya Singh Portfolio</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-brand-muted uppercase mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-brand-card border border-brand-border focus:border-brand-electric rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  placeholder="admin@domain.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-muted uppercase mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-brand-card border border-brand-border focus:border-brand-electric rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-brand-electric hover:bg-brand-electricHover disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-electric hover:shadow-electric-lg transition-all"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-brand-border/60 text-center font-mono text-[10px] text-brand-muted">
            <span>Default Seed Credentials:</span> <br />
            <span className="text-white">riyarssingh22@gmail.com</span> / <span className="text-white">AdminRiya2026!</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
