import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger-d046e.firebaseio.com/'
});

export default instance;