import axios from 'axios';

interface UserResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface TicketData {
  id: string;
  route: string;
  price: number;
  date: string;
}

const DATABASE_URL = 'https://busticketapp-f30e9-default-rtdb.europe-west1.firebasedatabase.app';

const API_KEY = 'AIzaSyBQze2YxIUZrl5h3o2AP_O4cjgTlZGzo6A';

export const registerUser = async (email: string, password: string): Promise<UserResponse> => {
  try {
    const response = await axios.post<UserResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Greška pri registraciji:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<UserResponse> => {
  try {
    const response = await axios.post<UserResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error('Firebase greška:', error.response.data.error.message);
    }
    throw error;
  }
};


export const addTicket = async (token: string, ticketData: TicketData): Promise<any> => {
  try {
    const response = await axios.post(
      `${DATABASE_URL}/tickets.json?auth=${token}`,
      ticketData
    );
    return response.data;
  } catch (error) {
    console.error('Greška pri dodavanju karte:', error);
    throw error;
  }
};

export const getTickets = async (token: string): Promise<Record<string, TicketData>> => {
  try {
    const response = await axios.get(`${DATABASE_URL}/tickets.json?auth=${token}`);
    return response.data;
  } catch (error) {
    console.error('Greška pri čitanju karata:', error);
    throw error;
  }
};

export const deleteTicket = async (token: string, ticketId: string): Promise<any> => {
  try {
    const response = await axios.delete(
      `${DATABASE_URL}/tickets/${ticketId}.json?auth=${token}`
    );
    return response.data;
  } catch (error) {
    console.error('Greška pri brisanju karte:', error);
    throw error;
  }
};