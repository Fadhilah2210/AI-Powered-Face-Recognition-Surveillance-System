import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers['Authorization'] = token;
		}
		return config;
	},
	(error) => {
		localStorage.removeItem('accessToken');
		window.location.href = '/signin';
		return Promise.reject(error);
	}
);
