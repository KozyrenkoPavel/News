import axios from 'axios';
import { TNews } from '../types/typesNews';

const API_URL = 'http://localhost:5000/api/news';

export const getNews = async () => {
  const response = await axios.get<TNews[]>(API_URL);

  return response.data;
};

export const addNews = async (news: TNews) => {
  const response = await axios.post<TNews>(API_URL, news);

  return response.data;
};

export const updateNews = async (id: string, news: TNews) => {
  const response = await axios.put<TNews>(`${API_URL}/${id}`, news);

  return response.data;
};

export const deleteNews = async (id: string) => {
  await axios.delete<TNews>(`${API_URL}/${id}`);
};
