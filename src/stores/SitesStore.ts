import Axios, { AxiosResponse } from 'axios';

class SitesStore {
  public sites: ISite[];
  constructor(sites: ISite[]) {
    this.sites = sites;
  }
  public async getSites() {
    if (this.sites && this.sites.length) {
      return Promise.resolve(this.sites);
    } else {
      const reponse: AxiosResponse<ISite[]> = await Axios.get(`https://api-itg.weaselspark.com/sites/all`);
      this.sites = reponse.data;
      return reponse.data;
    }
  }
}
export default new SitesStore([]);
