import React, { useState, useEffect } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonButton,IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonMenu,IonMenuButton,IonButtons,IonSearchbar,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { TicketData } from '../services/firebaseService';
import { getTickets } from '../services/firebaseService';
//import './Home.css';

const Home: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const history = useHistory();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const fetchedTickets = await getTickets(token);
          const ticketsArray = Object.keys(fetchedTickets).map(key => ({
            ...fetchedTickets[key] as TicketData,
            id: key
          }));
          setTickets(ticketsArray);
        } catch (error) {
          console.error('Greška pri učitavanju karata: ', error);
        }
      }
    };
  
    fetchTickets();
  }, []);
  

  const handleBuyTicket = (ticketId: string) => {
    history.push(`/ticket/${ticketId}`);
  };
  

  const handleNavigation = (path: string) => {
    history.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    console.log('Token obrisan');

    history.push('/login');
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
            <IonItem button onClick={handleLogout}>
              <IonLabel>Odjava</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar style={{ '--background': '#ffffff', '--color': '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle >BusTickets</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" style={{ '--background': '#787878 ' }}>
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
                      {filteredTickets.map(ticket => (
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
                            Detalji
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

