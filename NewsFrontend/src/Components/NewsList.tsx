import {
  fetchGetNews,
  selectNewsList,
  selectStyleAddedNewsDisplay,
  setStyleAddedNewsDisplay,
} from '../store/newsSlice';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { TNews } from '../types/typesNews';
import News from './News';
import AddNews from './AddNews';

function NewsList() {
  const news = useAppSelector(selectNewsList);
  const addedNewsDisplay = useAppSelector(selectStyleAddedNewsDisplay).display;
  const [text, setText] = useState('');

  const dispatch = useAppDispatch();

  const changeStyleDisplayAddedNews = () => {
    if (addedNewsDisplay === 'none') {
      dispatch(setStyleAddedNewsDisplay({ display: 'block' }));
    } else if (addedNewsDisplay === 'block') {
      dispatch(setStyleAddedNewsDisplay({ display: 'none' }));
    }
  };

  useEffect(() => {
    dispatch(fetchGetNews());
  }, [dispatch]);

  return (
    <div className="newsList__container">
      <header>Список Новостей</header>
      <div className="search">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
        <button>Поиск</button>
        <button onClick={changeStyleDisplayAddedNews}>
          Опубликовать новую новость
        </button>
      </div>

      <AddNews />

      {/* <form>
        <label>
          Добавть новость
          <input />
        </label>
      </form> */}

      {news.length ? (
        news.map((news: TNews, index: number) => (
          <News key={index} news={news} />
        ))
      ) : (
        <p>В данный момент новстей нет</p>
      )}
    </div>
  );
}

export default NewsList;
