import express, { request, response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const port = 3000;
const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const jsonDataPath = path.join(process.cwd(), 'data.json');

function readJsonData() {
    try {
        return JSON.parse(fs.readFileSync(jsonDataPath));
    } catch (error) {
        console.error('Fehler beim Lesen der JSON-Datei:', error);
        return {};
    }
}

function writeJsonData(data) {
    try {
        fs.writeFileSync(jsonDataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fehler beim Schreiben der JSON-Datei:', error);
    }
}

// Funktion zum Initialisieren der Datenbank
function initializeDatabase() {

    const initialData = [
        {
            id: randomUUID(),
            name: "alle_Lehrer",
            programm: "office_teams",
            raum: "alle_Raeume"
        }

    ];




    // Lösche die bestehende Datei, falls sie existiert
    if (fs.existsSync(jsonDataPath)) {
        fs.unlinkSync(jsonDataPath);
    }

    // Erstelle eine neue Datei mit den Initialdaten
    writeJsonData(initialData);

    console.log('Datenbank wurde neu initialisiert.');
};
// Rufe die Initialisierungsfunktion auf, wenn der Server startet
initializeDatabase();



//Endpoint /
app.get('/', (request, response) => {

    response.send("<h1>Der Webserver grüßt!</h1>");
});

//Endpoint /contacts -> Read
app.get('/entries/', (request, response) => {

    response.json(readJsonData());
});

//Endpoint /contacts/:id -> Read(id)
app.get('/entries/:id', (request, response) => {
    const daten = readJsonData();

    //request auswerten
    const id = request.params.id;

    const entry = daten.find(eintrag => eintrag.id === id);

    if (entry) {
        response.json(entry);
    } else {
        // If no contact existing return 404
        response.status(404).send("Entry not found");
    }


});

//Endpoint /contacts/:id -> delete

app.delete('/entries/:id', (request, response) => {
    const daten = readJsonData();

    //request auswerten
    const id = request.params.id;

    const index = daten.findIndex(contact => contact.id === id);

    if (index >= 0) {

        daten.splice(index, 1);
        writeJsonData(daten);

        response.send("Kontakt gelöscht");
    } else {
        response.status(404).send("No valid Entry found");
    }


});

//Endpoint /contacts/ -> erstellen
app.post('/entries/', (request, response) => {
    const newEntry = request.body;

    // Datenbank oder Speicherort für die Einträge (sicherstellen, dass es ein Array ist)
    let entries = readJsonData();
    if (!Array.isArray(entries)) {
        entries = [];
    }

    // Prüfen, ob das Programm bereits existiert
    let existingEntry = entries.find(entry => entry.programm === newEntry.programm);

    if (existingEntry) {
        // Falls der Raum schon vorhanden ist, nur den Lehrer ergänzen
        if (existingEntry.raum.includes(newEntry.raum)) {
            if (!existingEntry.name.includes(newEntry.name)) {
                existingEntry.name += `, ${newEntry.name}`;
            }
        } else {
            // Falls der Raum noch nicht existiert, den Raum und Lehrer ergänzen
            existingEntry.raum += `, ${newEntry.raum}`;
            if (!existingEntry.name.includes(newEntry.name)) {
                existingEntry.name += `, ${newEntry.name}`;
            }
        }
    } else {
        // Falls das Programm nicht existiert, neuen Eintrag hinzufügen
        newEntry.id = randomUUID();
        entries.push(newEntry);
    }

    writeJsonData(entries); // Änderungen speichern

    response.status(200).json({ message: "Eintrag erfolgreich verarbeitet", entries });
});


//Endpoint /contacts/ -> update
app.put('/entries/:id', (request, response) => {
    const id = request.params.id;
    const updatedContact = request.body;

    const index = daten.findIndex(contact => contact.id === id);

    if (index >= 0) {
        daten[index].name = updatedContact.name;
        daten[index].phone = updatedContact.phone;
        daten[index].email = updatedContact.email;

        writeJsonData(daten)

        response.send("Contact sucessfully updated");

    } else {
        response.status(404).send("No valid Entry found");
    }

});


// Server starten
app.listen(port, () => {
    console.log(`Webserver läuft auf Port ${port}`);
});
