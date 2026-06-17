import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';
import type { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  const raw = resolvedParams.slug?.[0] ?? 'all';

  return {
    title: `${raw} notes | NoteHub`,
    description: `Browse ${raw} notes in NoteHub`,

    openGraph: {
      title: `${raw} notes | NoteHub`,
      description: `Browse ${raw} notes in NoteHub`,
      url: `https://notehub.com/notes/filter/${raw}`,
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
}

export default async function FilterNotesPage({ params }: Props) {
  const resolvedParams = await params;

  const raw = resolvedParams.slug?.[0] ?? 'all';

  const tag: NoteTag | undefined = raw === 'all' ? undefined : (raw as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', raw],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={raw as NoteTag} />
    </HydrationBoundary>
  );
}
