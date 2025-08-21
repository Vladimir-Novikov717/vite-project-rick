


import { useFavorites } from '@/features/favorites/model/useFavorites';
import { Character } from '@/entities/character/model/types';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  // Здесь нужно загрузить данные персонажей по ID
  // Пока просто заглушка
  return (
    <div>
      <h1>Избранное</h1>
      {favorites.length === 0 ? (
        <p>Нет избранных персонажей</p>
      ) : (
        <ul>
          {favorites.map(id => (
            <li key={id}>Персонаж #{id} (заглушка)</li>
          ))}
        </ul>
      )}
    </div>
  );
}