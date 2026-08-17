#!/bin/bash

# Script per preparare il pacchetto per il Google Chrome Web Store Developer Dashboard
# e per il caricamento locale come estensione sviluppatore (Unpacked)

set -e

PROJECT_DIR="extension-public"
OUTPUT_DIR="submission_chrome"

echo "🚀 Inizio preparazione per Google Chrome Web Store..."

# 1. Entra nella cartella del progetto
cd "$PROJECT_DIR"

# 2. Installa dipendenze e builda
echo "📦 Installazione dipendenze e build di produzione..."
npm install
npm run build

# 3. Verifica i file critici nel dist
if [ ! -f "dist/manifest.json" ]; then
  echo "❌ Errore: manifest.json mancante in dist!"
  exit 1
fi
if [ ! -f "dist/background.js" ]; then
  echo "❌ Errore: background.js mancante in dist!"
  exit 1
fi
if [ ! -f "dist/index.html" ]; then
  echo "❌ Errore: index.html mancante in dist!"
  exit 1
fi

# 4. Crea la cartella di output
cd ..
mkdir -p "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR/unpacked"

# 5. Copia la versione scompattata (per test immediato in chrome://extensions -> Carica non pacchettizzata)
echo "📁 Aggiornamento cartella scompattata (submission_chrome/unpacked)..."
rm -rf "$OUTPUT_DIR/unpacked"/*
cp -R "$PROJECT_DIR/dist"/* "$OUTPUT_DIR/unpacked/"

# 6. Crea il pacchetto ZIP dell'estensione (manifest.json deve stare alla radice del file ZIP)
echo "📁 Creazione file ZIP per Chrome Web Store (submission_chrome/codiceamico-chrome-extension.zip)..."
rm -f "$OUTPUT_DIR/codiceamico-chrome-extension.zip"
cd "$PROJECT_DIR/dist"
zip -r "../../$OUTPUT_DIR/codiceamico-chrome-extension.zip" . -x "*.DS_Store"
cd ../..

ZIP_SIZE=$(du -h "$OUTPUT_DIR/codiceamico-chrome-extension.zip" | cut -f1)

echo ""
echo "=========================================================="
echo "🎉 BUILD CHROME COMPLETATO CON SUCCESSO!"
echo "=========================================================="
echo "📦 File ZIP pronto per l'upload: $OUTPUT_DIR/codiceamico-chrome-extension.zip ($ZIP_SIZE)"
echo "📂 Cartella Unpacked per test in locale: $OUTPUT_DIR/unpacked/"
echo "📄 Scheda Store completa e testi: $OUTPUT_DIR/STORE_LISTING.md"
echo ""
echo "📋 COME TESTARE IN LOCALE SU CHROME:"
echo "   1. Apri Google Chrome e vai su: chrome://extensions"
echo "   2. Attiva l'interruttore 'Modalità sviluppatore' (in alto a destra)"
echo "   3. Clicca su 'Carica estensione non pacchettizzata'"
echo "   4. Seleziona la cartella: $(pwd)/$OUTPUT_DIR/unpacked"
echo ""
echo "🚀 COME PUBBLICARE SUL CHROME WEB STORE:"
echo "   1. Apri: https://chrome.google.com/webstore/devconsole"
echo "   2. Clicca su 'Nuovo elemento' (New Item)"
echo "   3. Trascina o carica: $OUTPUT_DIR/codiceamico-chrome-extension.zip"
echo "   4. Compila i campi copiando i testi da: $OUTPUT_DIR/STORE_LISTING.md"
echo "   5. Invia per la revisione!"
echo "=========================================================="
