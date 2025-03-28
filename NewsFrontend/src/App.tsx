import { useEffect, useState } from 'react';
import './App.css';
import { addNews, deleteNews, getNews } from './api/newsApi';
import { TNew } from './types/typesNews';

function App() {
  const [state, setState] = useState<TNew[]>([]);

  const fetchGetNews = async () => {
    try {
      const response = await getNews();

      console.log(response, 'res');

      if (response) setState(response);
    } catch (error) {
      console.log(error);
    }
  };

  const createNews = () => {
    const data = {
      title: 'новость 1',
      description: 'описание новости 1',
      image: 'https://www.interfax.ru/ftproot/textphotos/2025/03/28/pk700.jpg',
      link: 'https://www.interfax.ru/russia/1017077',
    };

    addNews(data);
    fetchGetNews();
  };

  const clearNews = () => {
    // deleteNews('');
    // fetchGetNews();
  };

  useEffect(() => {
    fetchGetNews();
  }, []);

  return (
    <>
      <button onClick={createNews}>click</button>
      <button onClick={clearNews}>Удалить</button>
    </>
  );
}

export default App;
