import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonGrid, IonRow, IonCol, IonText} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#1F2833', '--color': '#66FCF1'  }}>
          <IonTitle>BusTickets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding"
      style={{ '--background': '#66FCF1' }}>
        <div className="login-container">
        <IonText className="welcome-text">
            <h2>Welcome, glad to see you!</h2>
            <p>Please login to continue.</p>
        </IonText>
        <IonGrid>
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
              <IonButton expand="block" onClick={handleLogin}>
                Login
              </IonButton>
            </IonCol>
          </IonRow>
            <IonRow>
              <IonCol className="register-link">
                <IonText color="medium">
                  Don't have an account?{' '}
                  <a
                    href="/register"
                    style={{ textDecoration: 'none', color: '#3880ff' }}
                  >
                    Sign up
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

export default Login;
