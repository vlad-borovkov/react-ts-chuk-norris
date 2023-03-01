import React from 'react';
import { ButtonDelete } from './favCardStyleComp';
import './fav-card.css';
import { IChuckNorrisJoke } from '../../types/Jokes';

interface IFavCard {
  jokesItem: IChuckNorrisJoke;
  handleDeleteJoke: any;
}

function FavCard(props: IFavCard) {
  const { jokesItem, handleDeleteJoke } = props;

  return (
    <li className='fav-card'>
      <p className='fav-card__quote'>{jokesItem.value}</p>
      <div className='fav-card__btn-wrap'>
        <ButtonDelete onClick={() => handleDeleteJoke(jokesItem.id)}>
          Удалить
        </ButtonDelete>
      </div>
    </li>
  );
}

export default FavCard;
