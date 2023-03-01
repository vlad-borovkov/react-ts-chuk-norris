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

// создали слайс - обёртка над редьюсором, который упрощает взаимодейтсвие. оттуда можно достать нужный нам редьюсор, в данном случае user
// также можно достать экшнкреетор, ведь слайс уже содержит в себе actionCreator. экспортируем для использования
export const jokeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // редюсор для асинхронных запросов
    jokeFetching(state) {
      state.isLoading = true;
    },
    jokeFetchingSuccses(state, action: PayloadAction<IChuckNorrisJoke>) {
      state.isLoading = false;
      state.error = '';
      state.jokes = action.payload;
    },
    jokeFetchingError(state, action: PayloadAction<string>) {
      //хардкодим стейт внутри редьюссора
      state.isLoading = false;
      //ссылаемся на получаемый текст ошибки
      state.error = action.payload;
    },
  },
});

//достали редьюсор user из слайса и передаём во внешнюю среду для взаимодействия: в store.ts где лежит рутовый редьюсор
export default jokeSlice.reducer;
