import Axios, { AxiosResponse } from 'axios';

export interface ISite {
  siteName: string;
  id: string;
}

class SitesStore {
  public site: ISite;
  public sites: ISite[];
  constructor() {
    this.sites = [];
    this.site = {
      id: '',
      siteName: '',
    };
  }
  public async getSites(forceRefresh?: boolean) {
    if (this.sites && this.sites.length && !forceRefresh) {
      return Promise.resolve(this.sites);
    } else {
      const reponse: AxiosResponse<ISite[]> = await Axios.get(`https://api-itg.weaselspark.com/sites/all`);
      this.sites = reponse.data;
      return reponse.data;
    }
  }

  public async deleteSite(index: string) {
    await Axios.delete(`https://api-itg.weaselspark.com/sites?index=${index}`);
    return true;
  }
}
export default new SitesStore();
