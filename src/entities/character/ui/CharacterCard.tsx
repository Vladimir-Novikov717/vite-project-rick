import { Link } from 'react-router-dom';  // переходить по страницам без перезагрузки 
import type { Character } from '@/entities/character/model/types';

interface Props { // определение пропсов
  character: Character; // обязательный объект с данными персонажа
  isFavorite?: boolean; // необязательный флаг в избранном тру
  onToggleFavorite?: (id: number) => void;
}

export default function CharacterCard({ character, isFavorite, onToggleFavorite }: Props) {
  return (
    <div style={{
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: 12,
      padding: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      gap: 12,
      transition: 'transform 0.2s ease',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.02)'
      }
    }}>
      <img src={character.image} alt={character.name} width={96} height={96}
           style={{borderRadius: 8, objectFit: 'cover'}} />
      <div style={{flex: 1}}>
        <Link to={`/characters/${character.id}`} style={{fontWeight: 700, textDecoration: 'none'}}>   
          {character.name}
        </Link> 
        <div style={{opacity: .8, marginTop: 4}}>
          {character.status} — {character.species}
        </div>
        {onToggleFavorite && (  // кнопка в избранное 
          <button     
            onClick={() => onToggleFavorite(character.id)}
            style={{
              marginTop: 8,
              padding: 4,
              backgroundColor: isFavorite ? '#646cff' : 'transparent',
              border: '1px solid #646cff',
              borderRadius: 4,
              color: isFavorite ? 'white' : '#646cff',
              cursor: 'pointer',
              fontSize: 12
            }}
            aria-label="toggle favorite"
          >
            {isFavorite ? '★ В избранном' : '☆ В избранное'}
          </button>
        )}
      </div>
    </div>
  );
}
