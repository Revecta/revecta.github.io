# 🛍️ Scheda Ufficiale Chrome Web Store - CodiceAmico

Guida rapida e testi pronti da copiare/incollare nel **Chrome Web Store Developer Dashboard**:  
👉 [https://chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)

---

## 1. Dettagli Principali del Negozio (Store Listing)

### 📌 Titolo dell'estensione (Extension Name)
```text
CodiceAmico - Trova Codici Sconto e Bonus
```

### 📌 Descrizione Breve (Summary / Short Description - max 132 car.)
```text
Trova e applica automaticamente i migliori codici sconto e bonus referral verificati mentre navighi.
```

### 📌 Categoria (Category)
- **Principale:** `Shopping`
- **Secondaria (opzionale):** `Produttività` (Productivity)

### 📌 Lingua (Language)
`Italiano` (con testi in inglese opzionali per la scheda globale)

---

## 2. Descrizione Dettagliata (Detailed Description)

### 🇮🇹 Versione Italiana (Consigliata)
```text
🚀 Risparmia automaticamente mentre fai acquisti e attivi servizi online con l'estensione ufficiale di CodiceAmico!

CodiceAmico è la piattaforma n. 1 in Italia per la condivisione e la scoperta di codici amico, bonus benvenuto e coupon sconto verificati dalla community.

Con l'estensione installata sul tuo browser, non dovrai più perdere tempo a cercare codici promozionali su forum o motori di ricerca: ti avvisiamo noi solo quando è disponibile un vero risparmio!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ COSA PUOI FARE CON CODICEAMICO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✔️ Riconoscimento Istantaneo: navigando su un sito partner, l'icona ti mostra quanti codici promo sono pronti all'uso.
✔️ Copia con 1 Click: copia il codice coupon istantaneamente negli appunti con feedback visivo.
✔️ Offerte Dirette: per i servizi con link invito, apri la pagina promozionale ufficiale con un solo tap.
✔️ Codici Verificati: visualizza il badge "Verificato" e il punteggio Karma dell'utente per la massima affidabilità.
✔️ Integrazione Account: se hai un account su codiceamico.app, visualizza il tuo profilo, Karma e aggiungi i tuoi codici direttamente dalla dashboard.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 BRAND E SERVIZI SUPPORTATI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Centinaia di brand aggiornati ogni giorno, tra cui:
• Banche e Finanza: ING Conto Arancio, Revolut, BBVA, Isybank, Hype, Trade Republic, Scalable Capital, Fineco, Illimity.
• Energia e Utenze: Octopus Energy, Sorgenia, NeN, Enel, Plenitude, Fastweb, Iliad, Very Mobile, Kena, Ho. Mobile.
• Shopping e Servizi: Satispay, Amazon, eBay, Airbnb, Telepass, Booking.com, Uber e molti altri!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 PRIVACY E SICUREZZA AL 100%:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nessun tracciamento invasivo: l'estensione rileva solo il dominio della scheda attiva per interrogare il database delle offerte.
• Nessuna vendita di dati personali a terzi.
• Completamente gratuita, senza pubblicità o banner ingombranti.

👉 Visita il portale completo: https://codiceamico.app
📄 Informativa sulla Privacy: https://codiceamico.app/privacy
```

### 🇬🇧 English Version (Optional for Global Listing)
```text
🚀 Automatically find and apply the best verified referral codes, discount promos, and welcome bonuses with CodiceAmico!

Features:
• Instant Detection: Automatically checks if promo codes are available for the site you are currently visiting.
• One-Click Copy: Quickly copy discount codes directly to your clipboard.
• Verified Community: Clear Karma score and verified badges for maximum trust.
• 100% Free & Privacy-friendly: No personal tracking, zero invasive ads.

Official website: https://codiceamico.app
Privacy Policy: https://codiceamico.app/privacy
```

---

## 3. Scheda Pratiche di Privacy (Privacy Practices Tab)

Nel Developer Dashboard di Chrome, compila i seguenti campi nella sezione **Privacy**:

### 🎯 Scopo Unico (Single Purpose Description)
```text
Trovare e mostrare agli utenti i codici sconto e bonus referral attivi per il sito web visitato al momento.
```

### 🔑 Giustificazione dei Permessi (Permission Justifications)
- **`activeTab`**:
  `Richiesto esclusivamente per leggere il dominio del sito su cui l'utente sta navigando al fine di verificare se sono presenti codici promozionali disponibili.`
- **`host_permissions` (`*://*.codiceamico.app/*`)**:
  `Utilizzato per comunicare con le API di codiceamico.app per il recupero dei codici in tempo reale e per la gestione della sessione utente/karma.`

### 📋 Dichiarazioni Dati (Data Usage Declarations)
- **L'estensione raccoglie dati personali?** `NO`
- **L'estensione vende dati a terze parti?** `NO`
- **L'estensione usa i dati per scopi non correlati alla funzionalità principale?** `NO`

---

## 4. Requisiti Grafici per lo Store (Graphics & Assets)

| Asset | Dimensioni richieste | Formato | Percorso file generato |
| :--- | :--- | :--- | :--- |
| **Icona Negozio** | `128 x 128 px` | PNG | `submission_chrome/assets/icon_128x128.png` |
| **Tile Promozionale Piccola** | `440 x 280 px` | PNG / JPEG | `submission_chrome/assets/promo_tile_small_440x280.png` |
| **Banner Promozionale Grande (Marquee)** | `1400 x 560 px` | PNG / JPEG | `submission_chrome/assets/marquee_banner_1400x560.png` |
| **Screenshot 1 (Popup Codici Attivi)** | `1280 x 800 px` | PNG / JPEG | `submission_chrome/assets/screenshot_1_1280x800.png` |
| **Screenshot 2 (Community & Karma)** | `1280 x 800 px` | PNG / JPEG | `submission_chrome/assets/screenshot_2_1280x800.png` |

---

## 5. File Pacchetto ZIP da Caricare
- **File:** `submission_chrome/codiceamico-chrome-extension.zip`
- **Contenuto:** Compilato pulito di `dist/` con `manifest.json` alla radice.
