import { IChuckNorrisJoke } from './../../types/Jokes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IJokesState {
  jokes: IChuckNorrisJoke;
  isLoading: boolean;
  error: string;
}

const initialState: IJokesState = {
  jokes: {
    categories: [],
    created_at: '',
    icon_url: '',
    id: '',
    updated_at: '',
    url: '',
    value: '',
  },
  isLoading: false,
  error: '',
};

export const jokeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    jokeFetching(state) {
      state.isLoading = true;
    },
    jokeFetchingSuccses(state, action: PayloadAction<IChuckNorrisJoke>) {
      state.isLoading = false;
      state.error = '';
      state.jokes = action.payload;
    },
    jokeFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default jokeSlice.reducer;
