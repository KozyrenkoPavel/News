import { deleteNews } from '../api/newsApi';
import { useAppDispatch } from '../store';
import {
  fetchGetNews,
  setIsOpenAddNews,
  setIsOpenChangeNews,
} from '../store/newsSlice';
import { TNews } from '../types/typesNews';

type TProps = {
  news: TNews;
  updateNewsCard: (news: TNews) => void;
};

function News({ news, updateNewsCard }: TProps) {
  const dispatch = useAppDispatch();

  const deleteCardNews = (id: string) => {
    deleteNews(id);

    dispatch(fetchGetNews());
  };

  const changeStyleDisplayChangeNews = () => {
    dispatch(setIsOpenChangeNews(true));
    dispatch(setIsOpenAddNews(false));

    updateNewsCard(news);
  };

  return (
    <div className="cardNews">
      <h1>{news?.title}</h1>
      {news?.image.includes('https') && <img src={news?.image} />}
      <p>{news?.description}</p>
      <a target="_blank" href={news?.link}>
        Перейти
      </a>
      <div className="changeCardNews">
        <button onClick={() => news?._id && deleteCardNews(news._id)}>
          Удалить
        </button>
        <button onClick={changeStyleDisplayChangeNews}>Редактировать</button>
      </div>
    </div>
  );
}

export default News;
