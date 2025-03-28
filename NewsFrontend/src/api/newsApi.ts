import axios from 'axios';
import { TNew } from '../types/typesNews';

const API_URL = 'http://localhost:5000/api/news';

export const getNews = async () => {
  const response = await axios.get<TNew[]>(API_URL);
  return response.data;
};

export const addNews = async (news: TNew) => {
  const response = await axios.post<TNew>(API_URL, news);
  return response.data;
};

export const updateNews = async (id: string, news: TNew) => {
  const response = await axios.put<TNew>(`${API_URL}/${id}`, news);
  return response.data;
};

export const deleteNews = async (id: string) => {
  await axios.delete<TNew>(`${API_URL}/${id}`);
};
