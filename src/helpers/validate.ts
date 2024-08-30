import { ILogin, ILoginError, IRegister, TRegisterError } from "@/interfaces/LoginRegister";

export function validatePassword(password: string): string | undefined {
    if (password && !/^\d+$/.test(password)) {
        return "The password must contain only numbers.";
    }
    return undefined; // Devuelve undefined si no hay error
}

export function validateLogin(values: ILogin): ILoginError {
    const errors: ILoginError = {};

    if (!values.email) {
        errors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
        errors.email = "Invalid email address.";
    }

    return errors;
}


export function validateRegisterLogin(values: IRegister): TRegisterError {
    const errors: TRegisterError = {};
  

    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      errors.email = "Invalid email address.";
    }
  
 
    if (!values.password) {
      errors.password = "Password is required.";
    } else if (!/^\d+$/.test(values.password)) {
      errors.password = "Password must contain only numbers.";
    }
  

    if (!values.name) {
      errors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(values.name)) {
      errors.name = "Name must contain only letters.";
    }
  

    if (!values.phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d+$/.test(values.phone)) {
      errors.phone = "Phone number must contain only numbers.";
    }
  

    if (!values.address) {
      errors.address = "Address is required.";
    } else if (!/^[A-Za-z\s]+$/.test(values.address)) {
      errors.address = "Address must contain only letters.";
    }
  
    return errors;
  }