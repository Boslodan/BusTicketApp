import React, { useState } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonItem,IonLabel,IonInput,IonButton,IonGrid,IonRow,IonCol,IonText,IonToast,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../services/firebaseService';
import './Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const history = useHistory();



  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleRegister = async () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Email mora biti u ispravnom formatu.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Lozinka mora imati minimum 8 karaktera.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        const result = await registerUser(email, password);
        console.log('Registracija uspešna:', result);
        
        setShowSuccessToast(true);
        setTimeout(() => {
          history.push('/login');
        }, 1500);
      } catch (error) {
        console.error('Greška pri registraciji:', error);
        setShowErrorToast(true);
      }
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
        <div className="register-container">
          <IonText className="register-text">
            <h2>Create your account!</h2>
            <p>Please register to get started.</p>
          </IonText>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonItem className="custom-item">
                  <IonLabel position="stacked" className="custom-label">
                    Username
                  </IonLabel>
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
                <IonItem className="custom-item">
                  <IonLabel position="stacked" className="custom-label">
                    Email
                  </IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                  />
                </IonItem>
                {emailError && (
                  <IonText color="danger">
                    <p className="error-message">{emailError}</p>
                  </IonText>
                )}
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
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                </IonItem>
                {passwordError && (
                  <IonText color="danger">
                    <p className="error-message">{passwordError}</p>
                  </IonText>
                )}
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
        <IonToast
          isOpen={showSuccessToast}
          message="Registration successful!"
          duration={1500}
          color="success"
          onDidDismiss={() => setShowSuccessToast(false)}
        />
        <IonToast
          isOpen={showErrorToast}
          message="Registration failed. Please try again."
          duration={1500}
          color="danger"
          onDidDismiss={() => setShowErrorToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;