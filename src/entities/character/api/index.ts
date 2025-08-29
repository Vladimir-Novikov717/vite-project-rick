// шаг 2 действие 4. Запросы по персонажам



import { apiFetch } from '@/shared/lib/api';
import type { Character, CharactersResponse } from '../model/types';

export function getCharacters(params?: { name?: string; status?: 'alive'|'dead'|'unknown'; page?: number }) {
  const sp = new URLSearchParams();
  if (params?.name) sp.set('name', params.name);
  if (params?.status) sp.set('status', params.status);
  if (params?.page) sp.set('page', String(params.page));
  const qs = sp.toString() ? `?${sp.toString()}` : '';
  return apiFetch<CharactersResponse>(`/character${qs}`);
}

export function getCharacterById(id: string | number) {
  return apiFetch<Character>(`/character/${id}`);
}

export function getCharactersByIds(ids: number[]) {
  const list = ids.join(',');
  return apiFetch<Character | Character[]>(`/character/${list}`);
}




//index.ts мы создали для всего что связанно с запросами к апи по персонажам.