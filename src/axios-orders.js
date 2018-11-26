import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://customize-your-fav-burger.firebaseio.com/'
});

export default instance;