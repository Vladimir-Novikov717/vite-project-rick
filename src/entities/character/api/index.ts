// шаг 2 действие 4. Запросы по персонажам



import { apiFetch } from '@/shared/lib/api';
import type { Character, CharactersResponse } from '../model/types'; //тип даннх одного персонажа и тип ответа от апи

export function getCharacters(
  params?: { name?: string; status?: 'alive'|'dead'|'unknown'; page?: number }
) {
  const sp = new URLSearchParams(); // типо блокнот для форматирования URL строки
  if (params?.name) sp.set('name', params.name); // это все параметры для этой строки
  if (params?.status) sp.set('status', params.status);
  if (params?.page) sp.set('page', String(params.page));
  const qs = sp.toString() ? `?${sp.toString()}` : '';
            
  return apiFetch<CharactersResponse>(`/character${qs}`); //формат ответа , возвращает промис с данными 
  }

export function getCharacterById(    // загрузка одного перс.
  id: string | number) {   // и число и строку
  return apiFetch<Character>(`/character/${id}`);
}

// сразу пригодится для избранного
export function getCharactersByIds(     // загрузка нескольких 
  ids: number[]) {
  const list = ids.join(',');  //превращает массив в строку
  return apiFetch<Character | Character[]>(`/character/${list}`);  // если один то в объекст, если больше в массив
}



//index.ts мы создали для всего что связанно с запросами к апи по персонажам.