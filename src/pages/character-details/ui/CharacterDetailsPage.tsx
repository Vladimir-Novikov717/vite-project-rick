import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacterById } from '@/entities/character/api';
import type { Character } from '@/entities/character/model/types';
import { useFavorites } from '@/features/favorites/model/useFavorites';

export default function CharacterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getCharacterById(id)
      .then(setItem)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="notice">Загрузка...</div>;
  if (error)   return <div className="notice notice--error">Ошибка: {error}</div>;
  if (!item)   return <div className="notice">Не найдено</div>;

  return (
    <div className="details">
      <img className="details__img" src={item.image} alt={item.name} />
      <div className="details__body">
        <h1>{item.name}</h1>
        <p><b>Статус:</b> {item.status}</p>
        <p><b>Вид:</b> {item.species}</p>
        {item.gender && <p><b>Пол:</b> {item.gender}</p>}
        {item.origin?.name && <p><b>Происхождение:</b> {item.origin.name}</p>}
        {item.location?.name && <p><b>Локация:</b> {item.location.name}</p>}

        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn" onClick={() => toggleFavorite(item.id)}>
            {isFavorite(item.id) ? '★ Удалить из избранного' : '☆ В избранное'}
          </button>
          <Link className="btn" to="/characters">← Вернуться к списку</Link>
        </div>
      </div>
    </div>
  );
}
