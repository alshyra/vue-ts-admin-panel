interface ISite {
  siteName: string;
  id: string;
}

interface IUser {
  email: string;
  language: 'FR' | 'EN';
  role: 'ADMIN' | 'USER';
  signupPending: false;
}
