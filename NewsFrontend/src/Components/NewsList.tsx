import {
  fetchGetNews,
  selectIsOpenAddNews,
  selectIsOpenChangeNews,
  selectNewsList,
  setIsOpenAddNews,
  setIsOpenChangeNews,
} from "../store/newsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { TNews } from "../types/typesNews";
import News from "./News";
import CardChangeNews from "./CardChangeNews";
import "./NewsList.css";

function NewsList() {
  const news = useAppSelector(selectNewsList);
  const [updateNews, setUpdateNews] = useState<TNews>({
    title: "",
    description: "",
    image: "",
    link: "",
  });
  const [text, setText] = useState("");

  const isOpenAddNews = useAppSelector(selectIsOpenAddNews);
  const isOpenChangeNews = useAppSelector(selectIsOpenChangeNews);

  const dispatch = useAppDispatch();

  const changeStyleDisplayAddedNews = () => {
    dispatch(setIsOpenAddNews(true));
    dispatch(setIsOpenChangeNews(false));
  };

  const updateNewsCard = (news: TNews) => {
    setUpdateNews(news);
  };

  const searchNewsByText = (text: string): TNews[] => {
    const convertedText = text.toLowerCase().replace(/\s+/g, "").trim();

    return news.filter((item: TNews) => {
      const convertedTitle = item.title
        .toLowerCase()
        .replace(/\s+/g, "")
        .trim();

      const convertedDescription = item.description
        .toLowerCase()
        .replace(/\s+/g, "")
        .trim();

      return (
        convertedTitle.includes(convertedText) ||
        convertedDescription.includes(convertedText)
      );
    });
  };

  useEffect(() => {
    dispatch(fetchGetNews());
  }, [dispatch]);

  const filteredNews = searchNewsByText(text);

  return (
    <div className="news-list">
      <header className="news-list__header">
        <img
          className="news-list__logo"
          src="https://img.icons8.com/?size=80&id=BuVxe5L6HlCc&format=png"
        />
        Список Новостей
      </header>
      <nav className="news-list__nav">
        <div className="news-list__nav--search">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Поиск"
          />

          <button
            onClick={() => {
              setText("");
            }}
          >
            Сбросить
          </button>
        </div>
        <div className="news-list__nav--create-news">
          <button onClick={changeStyleDisplayAddedNews}>
            Опубликовать новую новость
          </button>
        </div>
      </nav>

      {isOpenAddNews && <CardChangeNews />}
      {isOpenChangeNews && <CardChangeNews news={updateNews} />}

      {filteredNews.length ? (
        filteredNews.map((news: TNews, index: number) => (
          <News key={index} news={news} updateNewsCard={updateNewsCard} />
        ))
      ) : (
        <p>В данный момент новстей нет</p>
      )}
    </div>
  );
}

export default NewsList;
