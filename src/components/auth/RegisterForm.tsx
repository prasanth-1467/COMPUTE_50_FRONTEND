import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building, BookOpen, Calendar, Lock, UserPlus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { PasswordStrength } from './PasswordStrength';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '3rd Year',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fireConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 80,
      gravity: 0.8,
      decay: 0.92,
      startVelocity: 25,
      colors: ['#B6FF00', '#C8FF33', '#65A30D', '#22c55e', '#fbbf24', '#f97316'],
    };

    confetti({ ...defaults, particleCount: 40, origin: { x: 0.3, y: 0.6 } });
    confetti({ ...defaults, particleCount: 40, origin: { x: 0.7, y: 0.6 } });

    setTimeout(() => {
      confetti({ ...defaults, particleCount: 30, origin: { x: 0.5, y: 0.4 }, startVelocity: 35 });
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      fireConfetti();
      addToast('🎉 Registration successful! Welcome to Compute 50.', 'success');
      setTimeout(() => navigate('/profile'), 1200);
    } catch {
      setError('Registration failed. Please check form fields.');
      addToast('Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await register({
        name: 'Google Participant',
        email: 'google.student@psgtech.ac.in',
        phone: '+91 9876543210',
        college: 'PSG College of Technology',
        department: 'CSE',
        year: '3rd Year',
      });
      fireConfetti();
      addToast('🎉 Registration successful via Google! Welcome to Compute 50.', 'success');
      setTimeout(() => navigate('/profile'), 1200);
    } catch {
      addToast('Google sign-up failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Participant Registration</h2>
        <p className="text-xs text-[var(--text-secondary)] mt-1">Register now to enter Compute 50 Hackathon</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          placeholder="Alex Rivera"
          value={formData.name}
          onChange={handleChange}
          leftIcon={<User className="w-4 h-4" />}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="student@college.edu"
            value={formData.email}
            onChange={handleChange}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+91 9876543210"
            value={formData.phone}
            onChange={handleChange}
            leftIcon={<Phone className="w-4 h-4" />}
            required
          />
        </div>

        <Input
          label="College / Institution"
          name="college"
          placeholder="PSG College of Technology"
          value={formData.college}
          onChange={handleChange}
          leftIcon={<Building className="w-4 h-4" />}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Department"
            name="department"
            placeholder="Computer Science & Engineering"
            value={formData.department}
            onChange={handleChange}
            leftIcon={<BookOpen className="w-4 h-4" />}
            required
          />

          <div className="space-y-1.5 text-left">
            <label className="block text-sm font-medium text-[var(--text-primary)]">Year of Study</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                <Calendar className="w-4 h-4" />
              </div>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="block w-full rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer transition-colors"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />
          <PasswordStrength password={formData.password} />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={loading}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Create Participant Account
        </Button>
      </form>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border-color)]" />
        </div>
        <span className="relative bg-[var(--bg-surface)] px-3 text-xs text-[var(--text-secondary)]">OR</span>
      </div>

      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={handleGoogleSignup}
        disabled={loading}
      >
        Sign up with Google
      </Button>

      <p className="text-xs text-[var(--text-secondary)] text-center mt-6">
        Already registered?{' '}
        <Link to="/login" className="text-[var(--accent)] hover:underline font-semibold">
          Login here
        </Link>
      </p>
    </Card>
  );
};
