import { useEffect, useMemo, useState } from 'react';
import { getCharacters } from '@/entities/character/api';
import type { Character } from '@/entities/character/model/types';
import CharacterCard from '@/entities/character/ui/CharacterCard';
import { useFavorites } from '@/features/favorites/model/useFavorites';
import cosmos from '..//..//..//assets/images/cosmos.jpg';

export default function CharactersPage() {
  const [items, setItems] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [pagesTotal, setPagesTotal] = useState(1);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'' | 'alive' | 'dead' | 'unknown'>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const queryDeps = useMemo(() => ({ name, status, page }), [name, status, page]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCharacters({
      name: name.trim() || undefined,
      status: status || undefined,
      page,
    })
      .then((data) => {
        setItems(data.results);
        setPagesTotal(data.info.pages);
      })
      .catch((e) => {
        setItems([]);
        setPagesTotal(1);
        setError(e.message || 'Ошибка загрузки');
      })
      .finally(() => setLoading(false));
  }, [queryDeps]);

  const canPrev = page > 1;
  const canNext = page < pagesTotal;

  return (
    <div style={{
      // Фон космоса
      backgroundImage:  `url(${cosmos})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: 20,
      color: 'white', // текст белый на тёмном фоне
    }}>
      {/* Фильтры */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={name}
          onChange={(e) => { setPage(1); setName(e.target.value); }}
          placeholder="Имя..."
          style={{
            padding: 8,
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 4,
            color: 'white',
            outline: 'none'
          }}
        />
        <select
          value={status}
          onChange={(e) => { setPage(1); setStatus(e.target.value as any); }}
          style={{
            padding: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 4,
            color: 'white',
            outline: 'none'
          }}
        >
          <option value="">Статус: любой</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Контент */}
      {loading && <div style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Загрузка...</div>}
      {error && <div style={{ color: 'crimson', textAlign: 'center', fontSize: 18 }}>Ошибка: {error}</div>}

      {!loading && !error && (
        <>
          {items.length === 0 ? (
            <div style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Ничего не найдено</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
              width: '100%',
              margin: '0 auto',
              maxWidth: '1400px'
            }}>
              {items.map(ch => (
                <CharacterCard
                  key={ch.id}
                  character={ch}
                  isFavorite={isFavorite(ch.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}

          {/* Пагинация */}
          <div style={{
            display: 'flex',
            gap: 8,
            marginTop: 16,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={!canPrev} style={{
              padding: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 4,
              color: 'white',
              cursor: canPrev ? 'pointer' : 'not-allowed',
              outline: 'none'
            }}>
              ← Предыдущая
            </button>
            <span>Стр. {page} / {pagesTotal}</span>
            <button onClick={() => setPage(p => Math.min(pagesTotal, p + 1))} disabled={!canNext} style={{
              padding: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 4,
              color: 'white',
              cursor: canNext ? 'pointer' : 'not-allowed',
              outline: 'none'
            }}>
              Следующая →
            </button>
          </div>

          {/* Быстрый переход в избранное */}
          <div style={{ marginTop: 12, textAlign: 'center', opacity: 0.7, color: 'white' }}>
            Избранных: {favorites.length}
          </div>
        </>
      )}
    </div>
  );
}