'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';


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
    <div className="h-screen flex flex-col bg-slate-200 justify-center ">
      <main className="bg-white h-[425px] w-96 rounded-md p-5 shadow-xl flex flex-col items-center mx-auto">
        <h1 className="text-4xl font-bold p-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>
          <div>
            <Label htmlFor='text'>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className='w-72 shadow-md'
              placeholder='Enter your name'
            />
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className='w-72 shadow-md'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className='w-72 shadow-md'
              placeholder='Enter your password'
            />
          </div>
          <Button type="submit" className='w-48 mt-3 shadow-md'>Sign Up</Button>
        </form>

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      </main>
    </div>
  );
}
