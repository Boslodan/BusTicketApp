import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonBackButton,
  IonToast,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const DATABASE_URL = 'https://busticketapp-f30e9-default-rtdb.europe-west1.firebasedatabase.app';

const EditTicket: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [route, setRoute] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axios.get(
            `${DATABASE_URL}/tickets/${ticketId}.json?auth=${token}`
          );
          const ticket = response.data;
          setRoute(ticket.route);
          setDate(ticket.date);
          setPrice(ticket.price.toString());
        } else {
          console.error('Token nije pronađen. Korisnik nije autentifikovan.');
        }
      } catch (error) {
        console.error('Greška pri učitavanju podataka o karti:', error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleUpdateTicket = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setShowErrorToast(true);
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      setShowErrorToast(true);
      return;
    }

    try {
      await axios.patch(
        `${DATABASE_URL}/tickets/${ticketId}.json?auth=${token}`,
        { route, date, price: numericPrice }
      );
      setShowSuccessToast(true);
      setTimeout(() => history.push('/home'), 1200);
    } catch (error) {
      console.error('Greška pri ažuriranju karte:', error);
      setShowErrorToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#0054e9', '--color':'#dcdcdc' }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" style={{ '--color': '#dcdcdc' }}/>
          </IonButtons>
          <IonTitle>Izmeni kartu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ '--background': '#dcdcdc' }}>
        <IonItem>
          <IonLabel position="stacked">Linija</IonLabel>
          <IonInput
            value={route}
            onIonChange={(e) => setRoute(e.detail.value!)}
            placeholder="Unesite rutu"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Datum</IonLabel>
          <IonInput
            value={date}
            onIonChange={(e) => setDate(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Cena (RSD)</IonLabel>
          <IonInput
            type="number"
            value={price}
            onIonChange={(e) => setPrice(e.detail.value!)}
            placeholder="Unesite cenu"
          />
        </IonItem>
        <IonButton
          expand="block"
          color="primary"
          onClick={handleUpdateTicket}
          style={{ marginTop: '20px' }}
        >
          Ažuriraj kartu
        </IonButton>
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Karta je uspešno ažurirana!"
          duration={2000}
          color="success"
        />
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Greška pri ažuriranju karte. Pokušajte ponovo."
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default EditTicket;
