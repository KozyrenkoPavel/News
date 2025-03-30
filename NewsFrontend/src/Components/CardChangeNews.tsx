import { useEffect, useState } from 'react';
import { addNews, updateNews } from '../api/newsApi';
import { TNews } from '../types/typesNews';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchGetNews,
  selectIsOpenAddNews,
  selectIsOpenChangeNews,
  selectNewsList,
  setIsOpenAddNews,
  setIsOpenChangeNews,
} from '../store/newsSlice';
import './CardChangeNews.css';

type TPops = {
  news?: TNews;
  setSearchNews?: (news: TNews) => void;
};

function CardChangeNews({ news, setSearchNews }: TPops) {
  const newsUpdate = useAppSelector(selectNewsList);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');

  const dispatch = useAppDispatch();

  const isOpenAddNews = useAppSelector(selectIsOpenAddNews);
  const isOpenChangeNews = useAppSelector(selectIsOpenChangeNews);

  const createNews = (): void => {
    const dataNews: TNews = {
      title,
      description,
      image,
      link,
    };

    if (link.includes('https')) addNews(dataNews);

    dispatch(fetchGetNews());

    setTitle('');
    setDescription('');
    setImage('');
    setLink('');
  };

  const changeNews = (): void => {
    if (news?._id) {
      const dataNews = { title, description, image, link };

      updateNews(news._id, dataNews);

      setTitle('');
      setDescription('');
      setImage('');
      setLink('');

      dispatch(setIsOpenChangeNews(false));
      dispatch(setIsOpenAddNews(false));

      dispatch(fetchGetNews());

      // setSearchNews(newsUpdate);
    }
  };

  const changeStyleDisplayAddedNews = () => {
    dispatch(setIsOpenAddNews(false));
    dispatch(setIsOpenChangeNews(false));
  };

  useEffect(() => {
    if (news?._id) {
      setTitle(news?.title);
      setDescription(news?.description);
      setImage(news?.image);
      setLink(news?.link);
    }
  }, [news]);

  return (
    <div className="change-card">
      {isOpenAddNews && <header>Публикация новости</header>}
      {isOpenChangeNews && <header>Редактирование новости</header>}

      <div className="change-card__content">
        <label>
          <p>Заголовок</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок вашей новости"
          />
        </label>
        <label>
          <p>Описание</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание"
          />
        </label>
        <label>
          <p>Изображение</p>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Введите ссылку на изображение"
          />
        </label>
        <label>
          <p>Ссылка на новость</p>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Введите ссылку на вашу новость "
          />
        </label>
      </div>
      <div className="change-card__buttons">
        {isOpenAddNews && <button onClick={createNews}>Опубликовать</button>}
        {isOpenChangeNews && (
          <button onClick={changeNews}>Изменить содержимое</button>
        )}
        <button onClick={changeStyleDisplayAddedNews}>Закрыть</button>
      </div>
    </div>
  );
}

export default CardChangeNews;
