# API ROUTES

@response
{
success: boolean;
message: string;
data: T | null
}

## AUTH

### auth/register

- @params
  email: string;
  name: string;
  phoneNumber: string;
  country: string;
  password: string;
- @return
  T: {
  token: string;
  role: 'user' | 'admin'
  }

### auth/login

- @params
  email: string;
  password: string;
- @return
  T: {
  token: string;
  role: 'user' | 'admin'
  }

### auth/update_details

- @params
  email: string;
  name: string;
  phoneNumber: string;
  country: string;

### auth/update_password

old_password: string;
new_password: string;

## PRODUCTS

### products/get_all

- @params
    None
- @return
    T: {
    products: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
    }>
}

### products/get_by_id

- @params
    id: string;
- @return
    T: {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

### products/create

- @params
    name: string;
    price: number;
    quantity: number;
- @return
    T: {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

### products/update

- @params
    id: string;
    name: string;
    price: number;
    quantity: number;
- @return
    T: {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

### products/delete

- @params
    id: string;
- @return
    T: {
    id: string;
    name: string;
    price: number;
    quantity: number;
}