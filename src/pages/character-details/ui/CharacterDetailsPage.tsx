import { useParams } from 'react-router-dom'

export default function CharacterDetailsPage() {
  const { id } = useParams() // способ получить динамические части URL, отображения деталей сущности (например, страница персонажа по ID).
  return <div>Карточка персонажа #{id} (загрузка из API далее)</div>
}