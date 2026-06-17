import { redirect } from 'next/navigation';

import { checkSession } from '@/lib/api/serverApi';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  const session = await checkSession();

  if (session) {
    redirect('/profile');
  }

  return <>{children}</>;
}
