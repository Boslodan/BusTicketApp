import { useParams, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TicketData } from '../services/firebaseService';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBackButton, IonButtons, IonButton } from '@ionic/react';

const DATABASE_URL = 'https://busticketapp-f30e9-default-rtdb.europe-west1.firebasedatabase.app';

const TicketDetails: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const history = useHistory();
  const userEmail = localStorage.getItem('userEmail');


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

  const handleBuyTicket = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
  
      console.log('Token:', token);
      console.log('User ID:', userId);
  
      if (token && userId && ticket) {
        await axios.post(
          `${DATABASE_URL}/users/${userId}/tickets.json?auth=${token}`,
          ticket
        );
        alert('Karta je uspešno kupljena!');
        history.push('/myTickets');
      } else {
        console.error('Korisnik nije autentifikovan ili podaci o karti nisu dostupni.');
      }
    } catch (error) {
      console.error('Greška pri kupovini karte:', error);
      alert('Došlo je do greške prilikom kupovine karte.');
    }
  };
  
  const handleDeleteTicket = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token && ticketId) {
        await axios.delete(
          `${DATABASE_URL}/tickets/${ticketId}.json?auth=${token}`
        );
        alert('Karta je uspešno obrisana!');
        history.push('/home');
      } else {
        console.error('Greška pri autentifikaciji ili ID karte nije dostupan.');
      }
    } catch (error) {
      console.error('Greška pri brisanju karte:', error);
      alert('Došlo je do greške prilikom brisanja karte.');
    }
  };

  const handleEditTicket = () => {
    history.push(`/EditTicket/${ticketId}`);
  };
  

  if (!ticket) return <IonContent><div>Loading...</div></IonContent>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#0054e9', '--color':'#dcdcdc' }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" style={{ '--color': '#dcdcdc' }}/>
          </IonButtons>
          <IonTitle>Detalji karte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ '--background': '#dcdcdc' }}>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{ticket.route}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Cena:</strong> {ticket.price} RSD</p>
            <p><strong>Datum:</strong> {ticket.date}</p>
            {userEmail === 'admin@gmail.com' ? (
              <>
               <IonButton expand="full" color="warning" onClick={handleEditTicket}>
                  Izmeni
                </IonButton>
                <IonButton expand="full" color="danger" onClick={handleDeleteTicket}>
                  Obriši
                </IonButton>
              </>
            ) : (
              <IonButton expand="full" color="success" onClick={handleBuyTicket}>
                Kupi
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TicketDetails;
