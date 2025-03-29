import { deleteNews } from '../api/newsApi';
import { TNews } from '../types/typesNews';

type TProps = {
  news: TNews;
};

function News({ news }: TProps) {
  const deleteCardNews = (id: string) => {
    deleteNews(id);
  };

  return (
    <div className="cardNews">
      <h1>{news?.title}</h1>
      <img src={news?.image} />
      <p>{news?.description}</p>
      <a target="_blank" href={news?.link}>
        Перейти
      </a>
      <div className="changeCardNews">
        {/* <button onClick={() => deleteCardNews(news._id)}>Удалить</button> */}
      </div>
    </div>
  );
}

export default News;
