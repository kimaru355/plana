export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  phoneNumber: string;
  country: string;
}

export interface UserAdmin {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  phoneNumber: string;
  country: string;
  role: string;
}
