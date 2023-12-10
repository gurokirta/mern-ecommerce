type UserSchema = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type UserLoginSchema = {
  usernameOrEmail: string;
  password: string;
};
