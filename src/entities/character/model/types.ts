
// Основной тип персонажа из API

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type?: string;
  gender?: string;
  image: string;
  origin?: { name: string };
  location?: { name: string };
}

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersResponse {
  info: ApiInfo;
  results: Character[];
}




// Интерфейс Character помогает 
// 1 Описать структуру данных персонажа
// 2 Получить подсказки от TypeScript
// 3 Избежать ошибок при работе с API
// 4 Сделать код понятным и безопасным  я так понимаю это норм практика для TS