import { NavLink, Routes, Route } from 'react-router-dom'
import CharactersPage from './pages/characters/ui/CharactersPage'
import CharacterDetailsPage from './pages/character-details/ui/CharacterDetailsPage'
import FavoritesPage from './pages/favorites/ui/FavoritesPage'

export default function App() {
  return (
    <div style={{maxWidth: 1024, margin: '0 auto', padding: 16}}>
      <header style={{display: 'flex', gap: 12, marginBottom: 16}}>
        <NavLink to="/characters">Персонажи</NavLink>
        <NavLink to="/favorites">Избранное</NavLink>
      </header>

      <Routes>
        <Route path="/" element={<CharactersPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  )
}




  // https://rickandmortyapi.com/api/character