import {
  fetchGetNews,
  selectIsOpenAddNews,
  selectIsOpenChangeNews,
  selectNewsList,
  setIsOpenAddNews,
  setIsOpenChangeNews,
} from '../store/newsSlice';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { TNews } from '../types/typesNews';
import News from './News';
import CardChangeNews from './CardChangeNews';

function NewsList() {
  const news = useAppSelector(selectNewsList);
  const [searchNews, setSearchNews] = useState<TNews[]>(news);
  const [updateNews, setUpdateNews] = useState<TNews>({
    title: '',
    description: '',
    image: '',
    link: '',
  });
  const isOpenAddNews = useAppSelector(selectIsOpenAddNews);
  const isOpenChangeNews = useAppSelector(selectIsOpenChangeNews);

  const [text, setText] = useState('');

  const dispatch = useAppDispatch();

  const changeStyleDisplayAddedNews = () => {
    dispatch(setIsOpenAddNews(true));
    dispatch(setIsOpenChangeNews(false));
  };

  const updateNewsCard = (news: TNews) => {
    setUpdateNews(news);
  };

  const searchNewsByText = (text: string): void => {
    const filterNews = news.filter((item: TNews) => {
      const convertedText = text.toLowerCase().replace(/\s+/g, '').trim();

      const convertedTitle = item.title
        .toLowerCase()
        .replace(/\s+/g, '')
        .trim();

      const convertedDescription = item.description
        .toLowerCase()
        .replace(/\s+/g, '')
        .trim();

      const condition =
        convertedTitle.includes(convertedText) ||
        convertedDescription.includes(convertedText);

      return condition;
    });

    setSearchNews(filterNews);
    setText('');
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
        <button onClick={() => searchNewsByText(text)}>Поиск</button>
        <button
          onClick={() => {
            setText('');
            searchNewsByText(text);
          }}
        >
          Сбросить
        </button>
        <button onClick={changeStyleDisplayAddedNews}>
          Опубликовать новую новость
        </button>
      </div>

      {isOpenAddNews && <CardChangeNews />}
      {isOpenChangeNews && <CardChangeNews news={updateNews} />}

      {searchNews.length ? (
        searchNews.map((news: TNews, index: number) => (
          <News key={index} news={news} updateNewsCard={updateNewsCard} />
        ))
      ) : (
        <p>В данный момент новстей нет</p>
      )}
    </div>
  );
}

export default NewsList;
