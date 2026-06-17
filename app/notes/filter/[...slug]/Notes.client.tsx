'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api/clientApi';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

import type { FetchNotesResponse } from '@/lib/api/clientApi';
import type { NoteTag } from '@/types/note';

import css from './NotesPage.module.css';

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  useEffect(() => {
    setPage(1);
  }, [tag]);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: search,
        tag: tag === 'all' ? undefined : (tag as NoteTag),
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <Link href="/notes/action/create" className={css.button}>
          Create note
        </Link>

        <SearchBox value={search} onChange={handleSearch} />
      </div>

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination page={page} totalPages={data.totalPages} setPage={setPage} />
      )}
    </div>
  );
}
