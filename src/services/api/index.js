import axios from 'axios'

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://127.0.0.1:8000';
} else if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://vet-sys-ollyver.herokuapp.com';
}

const Api = axios.create({
    baseURL: API_URL
});

export default Api