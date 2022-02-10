import axios from 'axios';
export default class ServerUtils {
  constructor() {
    this.url = 'http://localhost:5001';
  }

  login = async (body) => {
    return axios.post('http://localhost:5001/api/v1/auth/login', body).then((result => { return result })).catch((e => { return e }))
  };

  logout = async () => {
    await fetch(this.url + 'auth/logout').then((data) =>
      (data = data.json()).then((data) => console.log(data))
    );
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.clear();
    window.location.href = '/';
  };
}
