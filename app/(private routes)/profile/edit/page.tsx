import type { Metadata } from 'next';

import ProfileForm from '@/components/ProfileForm/ProfileForm';
import { getMe } from '@/lib/api/serverApi';

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

export default async function EditProfilePage() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.formWrapper}>
        <h1 className={css.formTitle}>Edit profile</h1>

        <ProfileForm user={user} />
      </div>
    </main>
  );
}
