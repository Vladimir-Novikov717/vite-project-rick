import { Link } from 'react-router-dom';
import type { Character } from '@/entities/character/model/types';

interface Props {
  character: Character;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export default function CharacterCard({ character, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className="card">
      <img className="card__img" src={character.image} alt={character.name} />
      <div className="card__body">
        <Link to={`/characters/${character.id}`} className="card__title">
          {character.name}
        </Link>
        <div className="card__meta">{character.status} — {character.species}</div>

        {onToggleFavorite && (
          <button className="btn" onClick={() => onToggleFavorite(character.id)}>
            {isFavorite ? '★ В избранном' : '☆ В избранное'}
          </button>
        )}
      </div>
    </div>
  );
}

