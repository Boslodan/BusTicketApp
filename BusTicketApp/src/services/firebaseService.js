import axios from 'axios';

const DATABASE_URL = 'https://busticketapp-f30e9-default-rtdb.europe-west1.firebasedatabase.app';

const API_KEY = 'AIzaSyBQze2YxIUZrl5h3o2AP_O4cjgTlZGzo6A';

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    return response.data; // Vraća podatke o korisniku, uključujući token za autentifikaciju
  } catch (error) {
    console.error('Greška pri registraciji:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    return response.data; // Vraća podatke o korisniku, uključujući token za autentifikaciju
  } catch (error) {
    console.error('Greška pri prijavi:', error);
    throw error;
  }
};

export const addTicket = async (token, ticketData) => {
  try {
    const response = await axios.post(
      `${DATABASE_URL}/tickets.json?auth=${token}`,
      ticketData
    );
    return response.data; // Vraća podatke o dodatoj karti
  } catch (error) {
    console.error('Greška pri dodavanju karte:', error);
    throw error;
  }
};

export const getTickets = async (token) => {
  try {
    const response = await axios.get(`${DATABASE_URL}/tickets.json?auth=${token}`);
    return response.data; // Vraća sve karte iz baze podataka
  } catch (error) {
    console.error('Greška pri čitanju karata:', error);
    throw error;
  }
};

export const deleteTicket = async (token, ticketId) => {
  try {
    const response = await axios.delete(
      `${DATABASE_URL}/tickets/${ticketId}.json?auth=${token}`
    );
    return response.data; // Vraća potvrdu o brisanju
  } catch (error) {
    console.error('Greška pri brisanju karte:', error);
    throw error;
  }
};
