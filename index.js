const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// TWOJA BAZA KLUCZY
let licencje = {
    "START-YAGA": 1000,
    "TEST-123": 500
};

// GŁÓWNA ŚCIEŻKA (żeby nie wywalało na stronę Rendera)
app.get('/', (req, res) => {
    res.send("Serwer YAGA działa! Użyj /check?key=TWOJ_KLUCZ");
});

// ŚCIEŻKA SPRAWDZANIA
app.get('/check', (req, res) => {
    const key = req.query.key;
    if (licencje[key] && licencje[key] > 0) {
        licencje[key] -= 1;
        res.json({ status: "OK", remaining: licencje[key] });
    } else {
        res.json({ status: "ERROR", message: "Brak licencji" });
    }
});

// PORT (Render sam go przypisuje)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serwer aktywny na porcie ${PORT}`);
});
