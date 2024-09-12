import React, { useState } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonInput,IonItem,IonLabel,IonButton,IonButtons,IonBackButton, IonToast,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { addTicket } from '../services/firebaseService';

const AddTicket: React.FC = () => {
  const [route, setRoute] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const history = useHistory();

  const handleAddTicket = async () => {
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
      await addTicket({ route, date, price: numericPrice }, token);
      setShowSuccessToast(true);
      setRoute('');
      setDate('');
      setPrice('');
      setTimeout(() => history.push('/home'), 1200);
    } catch (error) {
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
          <IonTitle>Dodaj kartu</IonTitle>
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
            placeholder="datum-mesec-godina"
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
          color="success"
          onClick={handleAddTicket}
          style={{ marginTop: '20px' }}
        >
          Dodaj kartu
        </IonButton>
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Karta je uspešno dodata!"
          duration={2000}
          color="success"
        />
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Greška pri dodavanju karte. Pokušajte ponovo."
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default AddTicket;
