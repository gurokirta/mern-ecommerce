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
  email: string | undefined;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  profilePicture: string;
  isAdmin: boolean;
};

type BillingAddress = {
  _id: number;
  name: string;
  phoneNumber: string;
  address: string;
};

type Product = {
  title: string;
  description: string;
  measurements: string;
  price: number;
  discountedPrice: number;
  pictures: string[];
  colors: string[];
  category: string[];
  quantity: number;
  offer: boolean;
  _id?: number;
  reviews?: [
    {
      value: string;
      like: number;
      replies: string[] | string;
    },
  ];
  userRef?: number;
};
