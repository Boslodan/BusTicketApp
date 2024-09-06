import React, { useEffect, useState } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonGrid,IonRow,IonCol,IonMenu,IonButtons,IonMenuButton} from '@ionic/react';
import { useHistory } from 'react-router-dom';


const MyTickets: React.FC = () => {

    const [tickets, setTickets] = useState([
    { id: 1, route: 'Beograd -> Novi Sad', price: 1200, date: '2024-10-24' },
    { id: 2, route: 'Beograd -> Nis', price: 1700, date: '2024-10-12' },
  ]);

  const history = useHistory();

  const handleNavigation = (path: string) => {
    history.push(path);
  };


  useEffect(() => {
    // API
  }, []);

  return (


    <IonPage>
      <IonHeader>
      <IonToolbar style={{ '--background': '#1F2833', '--color': '#66FCF1', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <IonButtons slot="start">
              <IonMenuButton />
        </IonButtons>
          <IonTitle>BusTickets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ '--background': '#66FCF1' }}>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Moje karte</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {tickets.map((ticket) => (
                      <IonItem key={ticket.id}>
                        <IonLabel>
                          <h2>{ticket.route}</h2>
                          <p>Cena: {ticket.price} Rsd</p>
                          <p>Datum: {ticket.date}</p>
                        </IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyTickets;
