import axios from 'axios';
import { IChuckNorrisJoke } from './../../types/Jokes';
import { AppDispatch } from '../store';
import { jokeSlice } from './jokeSlice';

//создаём асинхронную функцию, redux-thunk уже под капотом в rtk, из экшн креэйтора возвращаем async функцию, которая аргументов возвращает диспатч
//для запросов используем axios

export const fetchJokes = () => async (dispatch: AppDispatch) => {
  try {
    //передаём в диспатч готовый actionCreator, он уже поставляется в слайсе.
    //начало загрузки, запускается лоадер
    dispatch(jokeSlice.actions.jokeFetching());
    //отправляется запрос на сервер
    const response = await axios.get<IChuckNorrisJoke>(
      'https://api.chucknorris.io/jokes/random'
    );
    //принимаем успешный запрос
    dispatch(jokeSlice.actions.jokeFetchingSuccses(response.data));
  } catch (err: any) {
    //обработали ошибку, чтобы TS не ругался подгрузили либу castError для работы с ошибками. НЕ ПОЛУЧИЛОСЬ, пока оставили any
    // let error = castError.expected(err);
    dispatch(jokeSlice.actions.jokeFetchingError(err.message));
  }
};
