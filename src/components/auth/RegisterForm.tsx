import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building, BookOpen, Calendar, Lock, UserPlus } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { useAuth } from '../../hooks/useAuth';

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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/profile');
    } catch {
      setError('Registration failed. Please check form fields.');
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
      navigate('/profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Participant Registration</h2>
        <p className="text-xs text-slate-400 mt-1">Register now to enter Compute 50 Hackathon</p>
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
            <label className="block text-sm font-medium text-slate-300">Year of Study</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="block w-full rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
          <div className="w-full border-t border-slate-800" />
        </div>
        <span className="relative bg-slate-900 px-3 text-xs text-slate-400">OR</span>
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

      <p className="text-xs text-slate-400 text-center mt-6">
        Already registered?{' '}
        <Link to="/login" className="text-blue-400 hover:underline font-semibold">
          Login here
        </Link>
      </p>
    </Card>
  );
};
