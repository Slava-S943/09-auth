'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next';

import Image from 'next/image';

import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './EditProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Edit profile | NoteHub',
  description: 'Edit your profile information',
  openGraph: {
    title: 'Edit profile | NoteHub',
    description: 'Edit your profile information',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function EditProfilePage() {
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const data = user ?? (await getMe());

        setUsername(data.username);
        setUser(data);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user, setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedUser = await updateMe({ username });

      setUser(updatedUser);

      router.push('/profile');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || ''}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={css.input}
              required
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button type="button" onClick={handleCancel} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
