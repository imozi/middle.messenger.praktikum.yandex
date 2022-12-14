export type UserProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UserPasswordResetData = {
  oldPassword: string;
  newPassword: string;
};

export type LoginData = {
  login: string;
};
