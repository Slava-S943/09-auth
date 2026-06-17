import { cookies } from 'next/headers';
import { api } from './api';

import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    headers: {
      Cookie: cookie,
    },
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};

export const checkSession = async () => {
  const cookie = await getCookieHeader();

  return api.get<User | null>('/auth/session', {
    headers: {
      Cookie: cookie,
    },
  });
};

export const getMe = async (): Promise<User> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};
