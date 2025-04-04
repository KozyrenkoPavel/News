import { useEffect, useState } from 'react';
import { addNews, updateNews } from '../api/newsApi';
import { TNews, TStyleBody } from '../types/typesNews';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchGetNews,
  selectIsOpenAddNews,
  selectIsOpenChangeNews,
  setIsOpenAddNews,
  setIsOpenChangeNews,
} from '../store/newsSlice';
import './CardChangeNews.css';

type TPops = {
  news?: TNews;
};

function CardChangeNews({ news }: TPops) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');

  const dispatch = useAppDispatch();

  const isOpenAddNews = useAppSelector(selectIsOpenAddNews);
  const isOpenChangeNews = useAppSelector(selectIsOpenChangeNews);

  const createNews = async (): Promise<void> => {
    const dataNews: TNews = {
      title,
      description,
      image,
      link,
    };

    if (link.includes('https')) await addNews(dataNews);

    dispatch(fetchGetNews());
    dispatch(setIsOpenAddNews(false));
  };

  const changeNews = async (): Promise<void> => {
    if (news?._id) {
      const dataNews = { title, description, image, link };

      await updateNews(news._id, dataNews);

      dispatch(fetchGetNews());

      dispatch(setIsOpenChangeNews(false));
    }
  };

  const changeStyleDisplayAddedNews = () => {
    dispatch(setIsOpenAddNews(false));
    dispatch(setIsOpenChangeNews(false));
  };

  const setStyleModalBackground = (): TStyleBody => {
    if (isOpenAddNews || isOpenChangeNews) return { filter: 'none' };
    else return { filter: 'blur(3px)' };
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
    <div className="change-card" style={setStyleModalBackground()}>
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
