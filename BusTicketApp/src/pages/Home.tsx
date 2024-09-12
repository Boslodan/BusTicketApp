import React, { useState, useEffect } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonButton,IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonMenu,IonMenuButton,IonButtons,IonSearchbar,  useIonViewWillEnter,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { TicketData } from '../services/firebaseService';
import { getTickets } from '../services/firebaseService';
//import './Home.css';

const Home: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const fetchTickets = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const fetchedTickets = await getTickets(token);
        const ticketsArray = Object.keys(fetchedTickets).map((key) => ({
          ...fetchedTickets[key] as TicketData,
          id: key,
        }));
        setTickets(ticketsArray);
      } catch (error) {
        console.error('Greška pri učitavanju karata:', error);
      }
    }
  };


  useEffect(() => {
    fetchTickets();
  }, []);

  useIonViewWillEnter(() => {
    const email= localStorage.getItem('userEmail');
    if(email) setUserEmail(email);  
    fetchTickets();

  });
  

  const handleBuyTicket = (ticketId: string) => {
    history.push(`/ticket/${ticketId}`);
  };
  

  const handleNavigation = (path: string) => {
    history.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
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
          <IonToolbar style={{ '--background': '#0054e9', '--color': '#dcdcdc', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IonButtons slot="start">
              <IonMenuButton style={{'--color':'#dcdcdc'}} />
            </IonButtons>
            <IonTitle >BusTickets</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" style={{ '--background': '#dcdcdc' }}>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader style={{'--background':'#0054e9'}}>
                    <IonCardTitle style={{'--color':'#ffffff',display:'flex', justifyContent:'center' }}>Dostupne linije</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent >
                  {userEmail === 'admin@gmail.com' && (
                      <IonButton color="danger" onClick={() => handleNavigation('/addTicket')}  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,
                        fontSize: '14px',width: 'auto',height: 'auto',marginTop: '10px',}}>
                        Dodaj kartu
                      </IonButton>
                    )}
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
                          {userEmail === 'admin@gmail.com' ? (
                            <IonButton
                              slot="end"
                              color="secondary"
                              onClick={() => handleBuyTicket(ticket.id)}
                            >
                              Uredi
                            </IonButton>
                          ) : (
                            <IonButton
                              slot="end"
                              color="primary"
                              onClick={() => handleBuyTicket(ticket.id)}
                            >
                              Detalji
                            </IonButton>
                          )}
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

