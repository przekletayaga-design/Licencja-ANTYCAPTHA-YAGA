const express = require('express');
const cors = require('cors');
const app = express();

// ODBLOKOWANIE WSZYSTKIEGO (Naprawia JSON ERR)
app.use(cors({ origin: '*' }));

let licencje = { 
    "START-YAGA": 1000,
    "TEST-123": 500 
};

// GŁÓWNA STRONA
app.get('/', (req, res) => {
    res.send("SERWER YAGA ONLINE");
});

// ŚCIEŻKA DLA BOTA
app.get('/check', (req, res) => {
    const key = req.query.key;
    if (licencje[key]) {
        // Nie odejmujemy punktu przy samym sprawdzaniu stanu (żeby nie znikły przy odświeżaniu)
        res.json({ status: "OK", remaining: licencje[key] });
    } else {
        res.status(404).json({ status: "ERROR", message: "Zly klucz" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
    console.log("Serwer ruszył na porcie " + PORT);
});
