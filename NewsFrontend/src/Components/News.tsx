import { deleteNews } from '../api/newsApi';
import { useAppDispatch } from '../store';
import { fetchGetNews } from '../store/newsSlice';
import { TNews } from '../types/typesNews';

type TProps = {
  news: TNews;
};

function News({ news }: TProps) {
  const dispatch = useAppDispatch();

  const deleteCardNews = (id: string) => {
    deleteNews(id);

    dispatch(fetchGetNews());
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
      </div>
    </div>
  );
}

export default News;
