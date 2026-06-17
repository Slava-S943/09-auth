import { redirect } from 'next/navigation';

import { checkSession } from '@/lib/api/serverApi';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: Readonly<PrivateLayoutProps>) {
  const session = await checkSession();

  if (!session) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
