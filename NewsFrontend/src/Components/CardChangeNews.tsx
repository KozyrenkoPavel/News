import { useEffect, useState } from 'react';
import { addNews, updateNews } from '../api/newsApi';
import { TNews } from '../types/typesNews';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchGetNews,
  selectIsOpenAddNews,
  selectIsOpenChangeNews,
  setIsOpenAddNews,
  setIsOpenChangeNews,
} from '../store/newsSlice';

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

      dispatch(fetchGetNews());

      setTitle('');
      setDescription('');
      setImage('');
      setLink('');

      dispatch(setIsOpenChangeNews(false));
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
    <div className="addNews">
      {isOpenAddNews && <header>Публикация новости</header>}
      {isOpenChangeNews && <header>Редактирование новости</header>}

      <form className="contentNews">
        <label>
          Заголовок
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок вашей новости"
          />
        </label>
        <label>
          Описание
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание"
          />
        </label>
        <label>
          Изображение
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Введите ссылку на изображение"
          />
        </label>
        <label>
          Ссылка на новость
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="ВВедите ссылку на вашу новость "
          />
        </label>
        {isOpenAddNews && <button onClick={createNews}>Опубликовать</button>}
        {isOpenChangeNews && (
          <button onClick={changeNews}>Изменить содержимое</button>
        )}
      </form>
      <button onClick={changeStyleDisplayAddedNews}>Закрыть</button>
    </div>
  );
}

export default CardChangeNews;
