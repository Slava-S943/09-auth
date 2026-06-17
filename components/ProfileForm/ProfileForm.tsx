'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './ProfileForm.module.css';

export default function ProfileForm() {
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [username, setUsername] = useState(user?.username || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedUser = await updateMe({
        username,
      });

      setUser(updatedUser);

      router.push('/profile');
      router.refresh();
    } catch {
      setError('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.field}>
        <label htmlFor="username">Username</label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        {error && <p className={css.error}>{error}</p>}
      </div>

      <button type="submit">Save changes</button>
    </form>
  );
}
