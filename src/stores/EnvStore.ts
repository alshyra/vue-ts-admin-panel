class EnvStore {
  public rootUrl() {
    return process.env.NODE_ENV === 'production' ? 'https://api.weaselspark.com' : 'https://api-itg.weaselspark.com';
  }
}

export default new EnvStore();
