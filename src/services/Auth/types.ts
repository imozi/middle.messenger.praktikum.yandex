export type UserSignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UserSignInData = {
  login: string;
  password: string;
};

export type ResponseSignUp = {
  id: string;
};
