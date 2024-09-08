import React, { useState } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonButton,IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonMenu,IonMenuButton,IonButtons,IonSearchbar,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
//import './Home.css';

const Home: React.FC = () => {
    const [tickets, setTickets] = useState([
        { id: 1, route: 'Beograd => Novi sad', price: 1200, date:'24.10.2024' },
        { id: 2, route: 'Beograd => Nis', price: 1700, date:'12.10.2024' },
        { id: 3, route: 'Novi sad => Subotica', price: 900, date:'03.10.2024' },
        { id: 4, route: 'Beograd => Budimpesta', price: 3000, date:'22.12.2024' }
      ]);

      
  const history = useHistory();
  const [searchText, setSearchText] = useState('');


  const handleBuyTicket = (ticketRoute: String) => {
    alert(`Karta ${ticketRoute} uspesno kupljena!`);
  };

  const handleNavigation = (path: string) => {
    history.push(path);
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.route.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <IonMenu side="start" contentId="main-content"  type="overlay" id='main-menu'>
        <IonContent>
          <IonList>
          <IonItem button onClick={() => handleNavigation('/home')}>
              <IonLabel>Kupovina karata</IonLabel>
            </IonItem>
            <IonItem button onClick={() => handleNavigation('/myTickets')}>
              <IonLabel>Moje karte</IonLabel>
            </IonItem>
            <IonItem button onClick={() => handleNavigation('/myAccount')}>
              <IonLabel>Moj nalog</IonLabel>
            </IonItem>
            <IonItem button onClick={() => handleNavigation('/login')}>
              <IonLabel>Odjava</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar style={{ '--background': '#1F2833', '--color': '#66FCF1', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle >BusTickets</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" style={{ '--background': '#66FCF1' }}>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle style={{display:'flex', justifyContent:'center' }}>Dostupne linije</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                  <IonSearchbar
                      value={searchText}
                      onIonChange={(e) => setSearchText(e.detail.value!)}
                      placeholder="Pretraži linije"
                    />
                    <IonList>
                      {filteredTickets.map((ticket) => (
                        <IonItem key={ticket.id}>
                          <IonLabel>
                            <h2>{ticket.route}</h2>
                            <p>Cena: {ticket.price} Rsd</p>
                            <p>Datum: {ticket.date}</p>
                          </IonLabel>
                          <IonButton
                            slot="end"
                            color="primary"
                            onClick={() => handleBuyTicket(ticket.route)}
                          >
                            Kupi
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
    </>
  );
};

export default Home;

