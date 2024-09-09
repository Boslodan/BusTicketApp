import React from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonGrid,IonRow,IonCol,IonIcon,IonButtons,IonMenuButton,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { logOutOutline, createOutline } from 'ionicons/icons';

const MyAccount: React.FC = () => {
  const history = useHistory();

  const handleEditProfile = () => {
    alert('Edit profile clicked');
  };

  const handleLogout = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar style={{ '--background': '#ffffff', '--color': '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle >Moj nalog</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12" className="ion-text-center">
              <h2>UserName</h2>
              <p>email@example.com</p>
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
