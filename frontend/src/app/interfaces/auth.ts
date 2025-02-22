export interface UserRegister {
  email: string;
  name: string;
  phoneNumber: string;
  country: string;
  password: string;
  confirmPassword?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserDetails {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  phoneNumber: string;
  country: string;
}

export interface UserPasswords {
  old_password: string;
  new_password: string;
  confirm_password?: string;
}
