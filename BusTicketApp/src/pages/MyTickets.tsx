import { useEffect, useState } from 'react';
import { TicketData } from '../services/firebaseService';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

const DATABASE_URL = 'https://busticketapp-f30e9-default-rtdb.europe-west1.firebasedatabase.app';

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
          const response = await axios.get<Record<string, TicketData>>(
            `${DATABASE_URL}/users/${userId}/tickets.json?auth=${token}`
          );
          const ticketsArray = Object.values(response.data || {});
          setTickets(ticketsArray);
        } else {
          console.error('Korisnik nije autentifikovan.');
        }
      } catch (error) {
        console.error('Greška pri učitavanju karata:', error);
      }
    };

    fetchMyTickets();
  }, []);

  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Moje karte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {tickets.map((ticket, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{ticket.route}</h2>
                <p>Cena: {ticket.price} RSD</p>
                <p>Datum: {ticket.date}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MyTickets;
