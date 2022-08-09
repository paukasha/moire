import axios from 'axios';

export default axios.create({
    baseURL: 'https://vue-moire.skillbox.cc/api/',
    params: {
        userAccessKey: localStorage.getItem('userAccessKey')
    }
});
