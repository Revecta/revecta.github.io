#!/bin/bash

# Script per preparare i pacchetti per la sottomissione a Mozilla (AMO)

PROJECT_DIR="extension-public"
OUTPUT_DIR="submission_mozilla"

echo "🚀 Inizio preparazione per Mozilla..."

# 1. Entra nella cartella del progetto
cd $PROJECT_DIR

# 2. Installa dipendenze e builda
echo "📦 Installazione dipendenze e build..."
npm install
npm run build

# 3. Crea la cartella di output
cd ..
mkdir -p $OUTPUT_DIR

# 4. Crea il pacchetto dell'estensione (quello che gli utenti scaricheranno)
echo "📁 Creazione pacchetto estensione (dist.zip)..."
cd $PROJECT_DIR/dist
zip -r ../../$OUTPUT_DIR/extension.zip . *
cd ../..

# 5. Crea il pacchetto del codice sorgente (obbligatorio per la review di Mozilla)
echo "📁 Creazione pacchetto codice sorgente (source.zip)..."
# Usiamo un file temporaneo per escludere node_modules e dist
zip -r $OUTPUT_DIR/source-code.zip $PROJECT_DIR -x "$PROJECT_DIR/node_modules/*" "$PROJECT_DIR/dist/*" "$PROJECT_DIR/.git/*"

echo "✅ Fatto! Trovi i file nella cartella: $OUTPUT_DIR"
echo "   - extension.zip: Caricalo come 'Add-on File'"
echo "   - source-code.zip: Caricalo come 'Source Code' (Mozilla lo richiede per i build minificati)"
