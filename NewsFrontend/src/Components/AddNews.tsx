import { useState } from 'react';
import { addNews } from '../api/newsApi';
import { TNews } from '../types/typesNews';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchGetNews,
  selectStyleAddedNewsDisplay,
  setStyleAddedNewsDisplay,
} from '../store/newsSlice';

function AddNews() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');

  const styleAddedNewsDisplay = useAppSelector(selectStyleAddedNewsDisplay);

  const dispatch = useAppDispatch();

  const createNews = (): void => {
    const dataNews: TNews = {
      title,
      description,
      image,
      link,
    };

    if (link.includes('https')) addNews(dataNews);

    setTitle('');
    setDescription('');
    setImage('');
    setLink('');

    dispatch(fetchGetNews());
  };

  const changeStyleDisplayAddedNews = () => {
    if (styleAddedNewsDisplay.display === 'none') {
      dispatch(setStyleAddedNewsDisplay({ display: 'block' }));
    } else if (styleAddedNewsDisplay.display === 'block') {
      dispatch(setStyleAddedNewsDisplay({ display: 'none' }));
    }
  };

  return (
    <div className="addNews" style={styleAddedNewsDisplay}>
      <header>Публикация новости</header>

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
        <button onClick={createNews}>Опубликовать</button>
      </form>
      <button onClick={changeStyleDisplayAddedNews}>Закрыть</button>
    </div>
  );
}

export default AddNews;
