import Axios from 'axios';
import EnvStore from './EnvStore';

class JwtStore {
  public jwtHeader: string = '';
  public saveJwt(jwtHeader: string) {
    this.jwtHeader = jwtHeader;
    localStorage.jwtHeader = jwtHeader;
    Axios.interceptors.request.use(
      (config) => {
        config.headers['x-auth-header'] = this.jwtHeader;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  public async loginUser(email: string, password: string) {
    const response = await Axios.post(`${EnvStore.rootUrl()}/authService/login`, {
      email,
      password,
    });
    this.saveJwt(response.headers['x-auth-header']);
  }
}

export default new JwtStore();
