import { useEffect, useState } from 'react';

const STORAGE_KEY = 'favorites'; //Данные будут храниться под именем 'favorites'.

export function useFavorites() {   //этот хук создает логику избранного, корзины 
  const [favorites, setFavorites] = useState<number[]>([]);
//       массив ID выбранных персонажей 

  useEffect(() => { 
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setFavorites(JSON.parse(raw)); //если не null преобразует  строку в массив
  }, []);


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };



  const isFavorite = (id: number) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}





//Хук useFavorites() — это как твой личный блокнот, куда ты можешь быстро записывать имена самых любимых персонажей и так же быстро их вычёркивать.