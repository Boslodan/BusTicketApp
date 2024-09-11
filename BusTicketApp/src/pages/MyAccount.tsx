import React, { useState, useEffect } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonGrid,IonRow,IonCol,IonIcon,IonButtons,IonMenuButton,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { logOutOutline, createOutline } from 'ionicons/icons';
import axios from 'axios';

const DATABASE_URL = 'https://busticketapp-f30e9-default-rtdb.europe-west1.firebasedatabase.app';


const MyAccount: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      
      if (token && userId) {
        try {
          const response = await axios.get(`${DATABASE_URL}/users/${userId}.json?auth=${token}`);
          console.log('Fetched user data:', response.data);

          const userData = response.data;

          if (userData) {
            setUsername(userData.username || 'N/A');
            setEmail(userData.email || 'N/A');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    alert('Edit profile clicked');
  };

  const handleLogout = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar style={{ '--background': '#0054e9', '--color': '#dcdcdc', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IonButtons slot="start">
              <IonMenuButton style={{'--color':'#dcdcdc'}} />
            </IonButtons>
            <IonTitle >Moj nalog</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent className="ion-padding"  style={{'--background':'#dcdcdc'}}>
        <IonGrid>
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12" className="ion-text-center">
              <h2>{username}</h2>
              <p>{email}</p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding">
            <IonCol size="12">
              <IonList>
                <IonItem button onClick={handleEditProfile}>
                  <IonIcon icon={createOutline} slot="start" />
                  <IonLabel>Uredi profil</IonLabel>
                </IonItem>
                <IonItem button onClick={handleLogout}>
                  <IonIcon icon={logOutOutline} slot="start" />
                  <IonLabel>Odjava</IonLabel>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyAccount;
