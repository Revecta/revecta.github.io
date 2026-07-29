# CodiceAmico Browser Extension

L'estensione ufficiale di [CodiceAmico.app](https://codiceamico.app) per trovare automaticamente bonus, sconti e codici referral mentre navighi.

## Funzionalità
- **Rilevamento Automatico**: Ti avvisa se il sito che stai visitando ha dei codici sconto disponibili.
- **Copia Rapida**: Copia i codici con un click direttamente dal popup.
- **Verifica Community**: Mostra i codici condivisi e verificati dalla community di CodiceAmico.

## Installazione per Sviluppatori

### Requisiti
- [Node.js](https://nodejs.org/) (consigliato v18+)
- [npm](https://www.npmjs.com/)

### Setup Locale
1. Installa le dipendenze:
   ```bash
   npm install
   ```
2. Crea il build:
   ```bash
   npm run build
   ```

## Caricamento nei Browser

### Google Chrome / Edge / Brave
1. Vai a `chrome://extensions/`.
2. Attiva la **Modalità sviluppatore**.
3. Clicca su **Carica estensione non pacchettizzata**.
4. Seleziona la cartella `dist` generata dal build.

### Mozilla Firefox
1. Vai a `about:debugging#/runtime/this-firefox`.
2. Clicca su **Installa componente aggiuntivo temporaneo**.
3. Seleziona il file `manifest.json` all'interno della cartella `dist`.

### Apple Safari (macOS)
Per caricare l'estensione in Safari, è necessario convertirla in un'app nativa utilizzando gli strumenti di Xcode:
1. Assicurati di avere Xcode installato.
2. Esegui il seguente comando dal terminale nella cartella radice del progetto:
   ```bash
   xcrun safari-web-extension-converter dist
   ```
3. Segui le istruzioni per aprire il progetto in Xcode e clicca su **Run**.
4. In Safari, vai in `Impostazioni > Estensioni` e abilita l'estensione (potrebbe essere necessario attivare il menu "Sviluppo" nelle impostazioni avanzate di Safari).

## Trasparenza e Sicurezza
Le API utilizzate sono quelle di [CodiceAmico.app](https://codiceamico.app).

---
Sviluppato da [CodiceAmico](https://codiceamico.app)
