import React, { useState } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonButton,IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle,IonCardContent,} from '@ionic/react';

const Home: React.FC = () => {

  const [tickets, setTickets] = useState([
    { id: 1, route: 'Beograd -> Novi sad', price: 1200, date:'24-10-2024' },
    { id: 2, route: 'Beograd -> Nis', price: 1700, date:'12-10-2024' },
    { id: 3, route: 'Novi sad -> Subotica', price: 900, date:'03-10-2024' },
    { id: 4, route: 'Beograd -> Budimpesta', price: 3000, date:'22-12-2024' }
  ]);

  const handleBuyTicket = (ticketId: number) => {
    alert(`Ticket ${ticketId} purchased successfully!`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#1F2833', '--color': '#66FCF1' }}>
          <IonTitle>BusTickets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ '--background': '#66FCF1' }}>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Dostupne linije</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {tickets.map((ticket) => (
                      <IonItem key={ticket.id}>
                        <IonLabel>
                          <h2>{ticket.route}</h2>
                          <p>Cena: {ticket.price} RSD</p>
                          <p>Datum: {ticket.date}</p>
                        </IonLabel>
                        <IonButton
                          slot="end"
                          color="primary"
                          onClick={() => handleBuyTicket(ticket.id)}
                        >
                          Buy
                        </IonButton>
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

export default Home;
