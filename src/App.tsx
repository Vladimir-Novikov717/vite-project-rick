import { NavLink, Route, Routes } from 'react-router-dom'
import CharactersPage from '@/pages/characters/ui/CharactersPage'
import CharacterDetailsPage from '@/pages/character-details/ui/CharacterDetailsPage'
import FavoritesPage from '@/pages/favorites/ui/FavoritesPage'
import styles from './entities/';


export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <nav className="nav">
          <NavLink to="/characters" className="nav__link">Персонажи</NavLink>
          <NavLink to="/favorites" className="nav__link">Избранное</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </div>
  )
}



  // https://rickandmortyapi.com/api/character