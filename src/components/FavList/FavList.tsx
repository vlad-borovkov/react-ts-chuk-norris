import React from 'react';
import FavCard from '../FavCard/FavCard';
import { ButtonDelete } from '../FavCard/favCardStyleComp';
import './fav-list.css';

function FavList() {
  const [jokesLocalArr, setJokesLocalArr] = React.useState(
    JSON.parse(localStorage.getItem('chuckJokes')) || []
  );

  const handleDeleteJoke = (jokeId: string) => {
    const filteredArr = jokesLocalArr.filter((item) => item.id !== jokeId);
    setJokesLocalArr(filteredArr);
    localStorage.setItem('chuckJokes', JSON.stringify(filteredArr));
  };

  const deleteAllJokes = () => {
    localStorage.removeItem('chuckJokes');
    setJokesLocalArr([]);
  };

  return (
    <>
      <>
        <h2>Список искромётного юмора</h2>
        <ul className='favlist'>
          {jokesLocalArr.length >= 1
            ? jokesLocalArr.map((item) => (
                <FavCard
                  key={item.id}
                  jokesItem={item}
                  handleDeleteJoke={handleDeleteJoke}
                />
              ))
            : 'Здесь еще нет шуток... перейди на главную страницу'}
        </ul>
      </>
      {jokesLocalArr.length >= 1 && (
        <ButtonDelete onClick={deleteAllJokes}>
          Уничтожить все шутки !
        </ButtonDelete>
      )}
    </>
  );
}

export default FavList;
