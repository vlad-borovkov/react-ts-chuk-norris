import React from 'react';
import './main.css';
import { Button, ButtonAddDelete, ButtonToFavorite } from './mainStyleComp';
import ChuckPng from './../../images/chuck.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchJokes } from '../../store/reducers/ActionCreators';
import { useHistory } from 'react-router-dom';

function Main() {
  const history = useHistory();
  const dispath = useAppDispatch();
  // можно навесить инфо об ошибках и спинер при желании...
  const { jokes, error, isLoading } = useAppSelector(
    (state) => state.jokeReducer
  );
  const [showJokes, setShowJokes] = React.useState(true);
  const handleShowJokes = () => {
    setShowJokes(!showJokes);
  };
  const [addJoke, setAddJoke] = React.useState(true);

  React.useEffect(() => {
    let intervalId;
    if (showJokes) {
      intervalId = setInterval(
        () => Promise.all([dispath(fetchJokes()), setAddJoke(true)]),
        3000
      );
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showJokes]);

  const handleSaveJoke = () => {
    setAddJoke(!addJoke);
    const chukJokesLocalArr = JSON.parse(localStorage.getItem('chuckJokes'));

    if (chukJokesLocalArr === null) {
      localStorage.setItem('chuckJokes', JSON.stringify([jokes]));
    } else if (chukJokesLocalArr.length === 10) {
      if (chukJokesLocalArr.some((item) => item.id === jokes.id)) {
        const filteredArr = chukJokesLocalArr.filter(
          (item) => item.id !== jokes.id
        );
        localStorage.setItem('chuckJokes', JSON.stringify(filteredArr));
      } else {
        const arrWithOutLast = chukJokesLocalArr.slice(0, 9);
        localStorage.setItem(
          'chuckJokes',
          JSON.stringify([...arrWithOutLast, jokes])
        );
      }
    } else if (chukJokesLocalArr) {
      if (chukJokesLocalArr.some((item) => item.id === jokes.id)) {
        const filteredArr = chukJokesLocalArr.filter(
          (item) => item.id !== jokes.id
        );
        localStorage.setItem('chuckJokes', JSON.stringify(filteredArr));
      } else
        localStorage.setItem(
          'chuckJokes',
          JSON.stringify([...chukJokesLocalArr, jokes])
        );
    }
  };

  return (
    <>
      <img className='chuck-img' src={ChuckPng} alt='внемли Чаку'></img>
      <div className='chuck-quote'>
        {jokes.value ? jokes.value : 'Сейчас будет шутка...'}
      </div>
      <div className='btn-wrap'>
        <Button onClick={handleShowJokes}>
          {showJokes ? 'Стоп' : 'Пуск!'}
        </Button>
        <ButtonAddDelete onClick={handleSaveJoke}>
          {addJoke ? 'Лайк и добавить' : 'Дислайк и удалить'}
        </ButtonAddDelete>
        <ButtonToFavorite onClick={() => history.push('/myfav')}>
          Любимые шутки
        </ButtonToFavorite>
      </div>
    </>
  );
}

export default Main;
