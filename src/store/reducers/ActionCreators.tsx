import axios from 'axios';
import { IChuckNorrisJoke } from './../../types/Jokes';
import { AppDispatch } from '../store';
import { jokeSlice } from './jokeSlice';

export const fetchJokes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(jokeSlice.actions.jokeFetching());
    const response = await axios.get<IChuckNorrisJoke>(
      'https://api.chucknorris.io/jokes/random'
    );
    dispatch(jokeSlice.actions.jokeFetchingSuccses(response.data));
  } catch (err: any) {
    dispatch(jokeSlice.actions.jokeFetchingError(err.message));
  }
};
