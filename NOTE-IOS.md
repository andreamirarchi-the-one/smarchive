# iOS: stato e prossimi passi

Il progetto nativo iOS esiste già ed è pronto (`ios/App/`, generato da Capacitor,
sincronizzato con `smarchive-prototype-nuovo-utente.html` come tutto il resto). Non è
stato buildato: questo Mac non può eseguire Xcode, quindi non c'è modo di compilarlo o
testarlo in Simulator da qui.

Nell'attesa, l'app è comunque utilizzabile su iPhone oggi stesso come **PWA** (vedi
`manifest.json` / `sw.js` — "Aggiungi a Home" da Safari, icona vera, schermo intero).

## Quando vorrai una vera app iOS nativa (App Store)

Due strade, entrambe richiedono qualcosa che non posso avviare da solo:

1. **Un Mac con Xcode funzionante.** Apri `ios/App/App.xcworkspace` (non il
   `.xcodeproj`), scegli un simulatore, Run. Se hai accesso a un Mac diverso o più
   aggiornato, il progetto è già pronto — basta clonare questo repo lì e lanciare
   `npm install && npm run cap:sync` prima di aprirlo in Xcode.
2. **Una build in cloud** (es. Codemagic, EAS Build/Ionic Appflow): compilano l'app
   partendo da questo stesso repo senza bisogno di un Mac, restituendo un `.ipa`
   installabile via TestFlight. Richiede un tuo account sul servizio scelto e, per la
   distribuzione via TestFlight/App Store, un Apple Developer Program a pagamento
   (99$/anno) — passaggi che spettano a te, non a me.

## Toolchain Android installata per riferimento

JDK 21 e Android SDK sono installati sotto `~/dev-tools/` (fuori da questo repo, nessuna
modifica al sistema — cancellabile in blocco se non serve più). Per rifare una build
Android di debug: `./android/build-debug.sh`.
