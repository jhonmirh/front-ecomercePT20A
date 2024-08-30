import IProduct from "./Products";

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginError {
    email?: string;
    password?: string | null;
}

export interface IRegister {
    email: string;
    password: string;
    name: string;
    phone: string;
    address: string;
}

export type TRegisterError = Partial<IRegister>;

export interface userSession {
    token: string;
    userData: {
        id: number;
        address: string;
        name: string;
        email: string;
        phone: string;
        ordes:[]
    }
}

export interface IOrder{
    id: number;
  status: string;
  date: string;
  products: IProduct[];
  user: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
  };
}