import { ILogin, IRegister } from "@/interfaces/LoginRegister"

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(userData: IRegister) {
    try {
        const res = await fetch(`${APIURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Falla en Registro');
        }

        return await res.json();
    } catch (error:any) {
        throw new Error(error);
    }
}



export async function loginUser(userData: ILogin) {
    try {
        const res = await fetch(`${APIURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Falla en Autenticación');
        }

        return await res.json();
    } catch (error: any) {
        console.error('Error during login:', error);
        throw new Error(error.message || 'Error en el proceso de login');
    }
}