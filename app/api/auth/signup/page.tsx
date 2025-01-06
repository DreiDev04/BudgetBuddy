'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import  Link  from  'next/link'
import { ChevronsLeft } from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMessage('User registered successfully!');
        setError('');
        setFormData({ name: '', email: '', password: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('Something went wrong');
      setSuccessMessage('');
    }
  };

  return (
  <div className="grid items-center justify-center h-screen">
    <Button asChild className="absolute top-4 left-4 h-10 w-10 p-4">
      <Link href="/">
        <span>
          <ChevronsLeft />
        </span>
      </Link>
    </Button>
    <div className="p-8 rounded-lg border w-[400px] space-y-6 text-center">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an Account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create a new account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label >Name</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label >Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="m@example.com"
            required
          />
        </div>
        <div>
          <label >Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}

            placeholder="Your password"
            required
          />
        </div>
        <Button
          type="submit"
          className='w-full'
        >
          Sign Up
        </Button>
      </form>


      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      <Button variant='link'>
        <Link href='/api/auth/signin'>
          Already have an account? Sign In
        </Link>
      </Button>
    </div>
  </div>
);

}
