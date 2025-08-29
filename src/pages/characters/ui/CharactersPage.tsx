import { useEffect, useMemo, useState } from 'react';
import { getCharacters } from '@/entities/character/api';
import type { Character } from '@/entities/character/model/types';
import CharacterCard from '@/entities/character/ui/CharacterCard';
import { useFavorites } from '@/features/favorites/model/useFavorites';
import styles from './CharactersPage.module.scss';

export default function CharactersPage() {
  const [items, setItems] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [pagesTotal, setPagesTotal] = useState(1);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'' | 'alive' | 'dead' | 'unknown'>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const deps = useMemo(() => ({ name, status, page }), [name, status, page]);

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
  }, [deps]);

  const canPrev = page > 1;
  const canNext = page < pagesTotal;

  return (
    <div className={styles.page}>
      {/* Фильтры */}
      <div className={styles.filters}>
        <input
          value={name}
          onChange={(e) => { setPage(1); setName(e.target.value); }}
          placeholder="Поиск по имени"
          className={styles.input}
        />
        <select
          value={status}
          onChange={(e) => { setPage(1); setStatus(e.target.value as any); }}
          className={styles.input}
        >
          <option value="">Статус: любой</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Состояния */}
      {loading && <div className={styles.notice}>Загрузка...</div>}
      {error && <div className={`${styles.notice} ${styles.error}`}>Ошибка: {error}</div>}

      {/* Сетка карточек */}
      {!loading && !error && (
        <>
          {items.length === 0 ? (
            <div className={styles.notice}>Ничего не найдено</div>
          ) : (
            <div className={styles.grid}>
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
          <div className={styles.pager}>
            <button
              className={styles.btn}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={!canPrev}
            >
              ← Назад
            </button>
            <span>Стр. {page} / {pagesTotal}</span>
            <button
              className={styles.btn}
              onClick={() => setPage(p => Math.min(pagesTotal, p + 1))}
              disabled={!canNext}
            >
              Вперёд →
            </button>
          </div>

          <div className={styles.notice}>Избранных: {favorites.length}</div>
        </>
      )}
    </div>
  );
}
