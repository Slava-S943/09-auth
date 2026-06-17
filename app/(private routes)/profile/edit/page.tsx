import type { Metadata } from 'next';
import EditProfileClient from './EditProfileClient';

export const metadata: Metadata = {
  title: 'Edit profile | NoteHub',
  description: 'Edit your profile information',
};

export default function Page() {
  return <EditProfileClient />;
}
