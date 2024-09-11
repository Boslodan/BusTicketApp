# BusTicketApp

# BusTickets - Aplikacija za Kupovinu Autobuskih Karata

## Opis Projekta

BusTickets je mobilna aplikacija razvijena u Ionic-u koristeći React za frontend i Firebase za backend. Aplikacija omogućava korisnicima da pretražuju, kupuju, pregledaju i otkazuju autobuske karte. Pored toga, aplikacija pruža korisnicima mogućnost upravljanja svojim nalozima, uključujući pregled korisničkog imena i email adrese, kao i opciju uređivanja profila.

## Tehnologije Korišćene u Projektu

- **React**: Frontend biblioteka za izradu korisničkog interfejsa.
- **Ionic**: Framework za izradu hibridnih mobilnih i web aplikacija sa responsivnim korisničkim iskustvom.
- **Firebase**: Backend servis koji uključuje autentifikaciju korisnika, Realtime Database za čuvanje podataka o korisnicima i kartama, i Firebase Authentication za prijavu i registraciju korisnika.
- **Axios**: Biblioteka za pravljenje HTTP zahteva prema Firebase-u.

## Ključne Funkcionalnosti

1. **Registracija i Prijava Korisnika**:

   - Korisnici mogu da se registruju putem email-a i lozinke, nakon čega se njihovi podaci čuvaju u Firebase Realtime Database.
   - Prijava omogućava pristup svim funkcionalnostima aplikacije.

2. **Kupovina Karata**:

   - Prikaz dostupnih linija sa informacijama o ruti, ceni i datumu.
   - Kupovina karata koje se čuvaju pod korisničkim nalogom.

3. **Pregled i Upravljanje Kupljenim Kartama**:

   - Prikaz svih karata koje je korisnik kupio.
   - Mogućnost otkazivanja karata direktno sa liste uz trenutno ažuriranje pregleda.

4. **Pretraga Linija**:

   - Pretraga dostupnih linija pomoću pretraživača, omogućavajući korisnicima da lako pronađu željenu rutu.

5. **Upravljanje Nalogom Korisnika**:

   - Pregled i prikaz korisničkog imena i email-a ulogovanog korisnika.
   - Mogućnost uređivanja korisničkih informacija i odjave sa naloga.

6. **Navigacija i Responsivni Interfejs**:
   - Jednostavna navigacija putem bočnog menija sa opcijama za pregled karata, moj nalog, i odjavu.
   - Responsivni dizajn prilagođen svim uređajima, od mobilnih telefona do desktop računara.

## Instalacija i Pokretanje Projekta

### Pre Zahteva

- Node.js i npm (Node Package Manager) moraju biti instalirani na računaru.

### Koraci za Pokretanje

1. **Kloniraj repozitorijum**:

   ```bash
   git clone https://github.com/tvoj-repozitorijum/bustickets.git
   cd bustickets

   ```

2. **Instaliraj zavisnosti**:
   npm install
3. **Pokreni aplikaciju**
   npm start
