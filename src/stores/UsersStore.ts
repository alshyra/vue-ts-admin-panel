import Axios, { AxiosPromise, AxiosResponse } from 'axios';

export interface IUser {
  email: string;
  language: 'FR' | 'EN';
  role: 'ADMIN' | 'USER';
  signupPending: false;
}

class UsersStore {
  public async getUsers(index: string) {
    const reponse: AxiosResponse<IUser[]> =
      await Axios.get(`https://api-itg.weaselspark.com/users/userList?index=${index}`);
    return reponse.data;
  }

  public async saveUser(index: string, userDTO: IUser) {
    console.log(index, userDTO);
    const reponse = await Axios.post(`https://api-itg.weaselspark.com/users/saveAuthorization?index=${index}&language=FR`, userDTO);
    return reponse.data;
  }
}
export default new UsersStore();
