import { useEffect, useState } from 'react';
import { getCharactersByIds } from '@/entities/character/api';
import type { Character } from '@/entities/character/model/types';
import CharacterCard from '@/entities/character/ui/CharacterCard';
import { useFavorites } from '@/features/favorites/model/useFavorites';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [items, setItems] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!favorites.length) { setItems([]); return; }
    setLoading(true);
    getCharactersByIds(favorites)
      .then((res) => {
        const arr = Array.isArray(res) ? res : [res];
        // на всякий случай отфильтруем null/undefined
        setItems(arr.filter(Boolean));
      })
      .finally(() => setLoading(false));
  }, [favorites]);

  if (!favorites.length) return <div className="notice">Вы пока никого не добавили</div>;
  if (loading) return <div className="notice">Загрузка избранного...</div>;

  return (
    <div className="grid">
      {items.map(ch => (
        <CharacterCard
          key={ch.id}
          character={ch}
          isFavorite={true}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
