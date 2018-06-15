import Axios from 'axios';

class UsersStore {
  public async getUsers(index: string) {
    const reponse = await Axios.get(`https://api-itg.weaselspark.com/users/userList?index=${index}`);
    return reponse.data;
  }
}
export default new UsersStore();
