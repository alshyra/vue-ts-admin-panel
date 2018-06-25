import EnvStore from '@/stores/EnvStore';
import Axios, { AxiosResponse } from 'axios';

export interface IUser {
  email: string;
  language: 'FR' | 'EN';
  role: 'ADMIN' | 'USER';
  signupPending: false;
}

class UsersStore {
  public async getUsers(index: string) {
    const reponse: AxiosResponse<IUser[]> = await Axios.get(`${EnvStore.rootUrl()}/users/userList?index=${index}`);
    return reponse.data;
  }

  public async saveUser(index: string, userDTO: IUser) {
    const reponse =
      await Axios.post(`${EnvStore.rootUrl()}/users/saveAuthorization?index=${index}&language=FR`, userDTO);
    return reponse.data;
  }
}
export default new UsersStore();
