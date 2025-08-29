
import { useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      const updated = isFav
        ? prev.filter((fid) => fid !== id)
        : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  return { favorites, toggleFavorite };
}

// создали хук который будет хранить данные о персонажах в локал и позволяет