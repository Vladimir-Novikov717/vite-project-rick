export const API_URL = import.meta.env.VITE_API_URL as string;  // грубо говоря, из .env взял ссылку на апи и вставил сюда, удобно чтобы не вставлять ссылку постоянно.

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {    // создал функцию apiFetch, это <T> - заглушка. Позволяет рабоать с разными типами данных, не зная какой вернется с АПИ
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {        // "Если ответ НЕ успешный"  --  проверка, успешно ли прошел запрос с апи
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}