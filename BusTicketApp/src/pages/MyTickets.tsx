import { useEffect, useState } from 'react';
import { TicketData } from '../services/firebaseService';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonToast, IonMenuButton, IonButtons } from '@ionic/react';

const DATABASE_URL = 'https://busticketapp-f30e9-default-rtdb.europe-west1.firebasedatabase.app';

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<{ id: string; data: TicketData }[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
          const response = await axios.get<Record<string, TicketData>>(
            `${DATABASE_URL}/users/${userId}/tickets.json?auth=${token}`
          );
          const ticketsArray = Object.entries(response.data || {}).map(([id, data]) => ({ id, data }));
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

  const handleCancelTicket = async (ticketId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        await axios.delete(`${DATABASE_URL}/users/${userId}/tickets/${ticketId}.json?auth=${token}`);
        setTickets((prevTickets) => prevTickets.filter(ticket => ticket.id !== ticketId));
        setShowSuccessToast(true);
      } else {
        console.error('Korisnik nije autentifikovan.');
        setShowErrorToast(true);
      }
    } catch (error) {
      console.error('Greška pri otkazivanju karte:', error);
      setShowErrorToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar style={{ '--background': '#ffffff', '--color': '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle >Moje karte</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {tickets.map(({ id, data }) => (
            <IonItem key={id}>
              <IonLabel>
                <h2>{data.route}</h2>
                <p>Cena: {data.price} RSD</p>
                <p>Datum: {data.date}</p>
              </IonLabel>
              <IonButton color="danger" onClick={() => handleCancelTicket(id)}>
                Otkaži
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonToast
          isOpen={showSuccessToast}
          message="Karta je uspešno otkazana."
          duration={1500}
          color="success"
          onDidDismiss={() => setShowSuccessToast(false)}
        />
        <IonToast
          isOpen={showErrorToast}
          message="Greška pri otkazivanju karte."
          duration={1500}
          color="danger"
          onDidDismiss={() => setShowErrorToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default MyTickets;
