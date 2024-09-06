import React, { useState } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonItem,IonLabel,IonInput,IonButton,IonGrid,IonRow,IonCol,IonText,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar style={{ '--background': '#1F2833', '--color': '#66FCF1', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <IonTitle>BusTickets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ '--background': '#66FCF1' }}>
        <div className="register-container">
          <IonText className="register-text">
            <h2>Create your account!</h2>
            <p>Please register to get started.</p>
          </IonText>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput
                    type="text"
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={handleRegister}>
                  Register
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="login-link">
                <IonText color="medium">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    style={{ textDecoration: 'none', color: '#3880ff' }}
                  >
                    Login
                  </a>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;