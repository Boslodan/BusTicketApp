import React, { useState } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonItem,IonLabel,IonInput,IonButton,IonGrid,IonRow,IonCol,IonText,IonToast,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/firebaseService';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      console.error('Nedostaju podaci za prijavu');
      setShowErrorToast(true);
      return;
    }

    try {
      const result = await loginUser(email, password);
      console.log('Prijava uspešna:', result);
      
      localStorage.setItem('authToken', result.idToken);
      localStorage.setItem('userId', result.localId); 
      
      setShowSuccessToast(true);
      setTimeout(() => {
        history.push('/home');
      }, 1500);
    } catch (error) {
      console.error('Greška pri prijavi:', error);
      setShowErrorToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar style={{ '--background': '#0054e9', '--color': '#dcdcdc', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <IonTitle>BusTickets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ '--background': '#dcdcdc' }}>
        <div className="login-container">
          <IonText className="welcome-text">
            <h2>Welcome, glad to see you!</h2>
            <p>Please login to continue.</p>
          </IonText>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonItem className="custom-item">
                  <IonLabel position="stacked" className="custom-label">
                    Email
                  </IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    className="custom-input"
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem className="custom-item">
                  <IonLabel position="stacked" className="custom-label">
                    Password
                  </IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => {
                      const value = e.detail.value;
                      if (value) {
                        setPassword(value);
                      } else {
                        console.error('Lozinka nije validna');
                      }
                    }}
                    className="custom-input"
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
                <IonText color="#000000">
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
        <IonToast
          isOpen={showSuccessToast}
          message="Login successful!"
          duration={1500}
          color="success"
          onDidDismiss={() => setShowSuccessToast(false)}
        />
        <IonToast
          isOpen={showErrorToast}
          message="Login failed. Please check your credentials."
          duration={1500}
          color="danger"
          onDidDismiss={() => setShowErrorToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
