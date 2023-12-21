type UserRegisterSchema = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type UserLoginSchema = {
  usernameOrEmail: string;
  password: string;
};

type UserSchema = {
  _id: number;
  firstName: string;
  secondName: string;
  displayName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
};
