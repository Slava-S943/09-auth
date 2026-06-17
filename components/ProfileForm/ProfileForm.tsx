'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { User } from '@/types/user';

import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type ProfileFormProps = {
  user: User;
};

export default function ProfileForm({ user }: Readonly<ProfileFormProps>) {
  const router = useRouter();

  const setUser = useAuthStore(state => state.setUser);

  const [username, setUsername] = useState(user.username);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
        />

        {error && <p>{error}</p>}

        <button type="submit">Save changes</button>
      </div>
    </form>
  );
}
