import { deleteNews } from '../api/newsApi';
import { useAppDispatch } from '../store';
import {
  fetchGetNews,
  setIsOpenAddNews,
  setIsOpenChangeNews,
} from '../store/newsSlice';
import { TNews } from '../types/typesNews';
import { useMediaQuery } from 'react-responsive';
import './News.css';

type TProps = {
  news: TNews;
  updateNewsCard: (news: TNews) => void;
};

function News({ news, updateNewsCard }: TProps) {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const deleteCardNews = async (id: string): Promise<void> => {
    await deleteNews(id);

    dispatch(fetchGetNews());
  };

  const changeStyleDisplayChangeNews = () => {
    dispatch(setIsOpenChangeNews(true));
    dispatch(setIsOpenAddNews(false));

    updateNewsCard(news);
  };

  return (
    <div className="card-news">
      <h3>{news?.title}</h3>

      <div className="card-news__content">
        {news?.image.includes('https') && <img src={news?.image} />}
        {!isMobile && <p>{news?.description.slice(0, 260) + '...'}</p>}
      </div>

      <div className="card-news__buttons">
        <a target="_blank" href={news?.link}>
          Перейти
        </a>
        <div className="card-news__buttons--change">
          <button onClick={() => news?._id && deleteCardNews(news._id)}>
            Удалить
          </button>
          <button onClick={changeStyleDisplayChangeNews}>Редактировать</button>
        </div>
      </div>
    </div>
  );
}

export default News;
