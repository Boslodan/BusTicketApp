import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TicketData } from '../services/firebaseService';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBackButton, IonButtons } from '@ionic/react';

const DATABASE_URL = 'https://busticketapp-f30e9-default-rtdb.europe-west1.firebasedatabase.app';

const TicketDetails: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<TicketData | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          console.log('Fetching ticket with ID:', ticketId);
          const response = await axios.get<TicketData>(
            `${DATABASE_URL}/tickets/${ticketId}.json?auth=${token}`
          );
          console.log('Response data:', response.data);
          setTicket(response.data);
        } else {
          console.error('Token nije pronađen. Korisnik nije autentifikovan.');
        }
      } catch (error) {
        console.error('Greška pri učitavanju podataka o karti:', error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (!ticket) return <IonContent><div>Loading...</div></IonContent>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Detalji karte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{ticket.route}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Cena:</strong> {ticket.price} RSD</p>
            <p><strong>Datum:</strong> {ticket.date}</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TicketDetails;
