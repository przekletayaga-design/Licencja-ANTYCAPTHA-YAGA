const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Baza kluczy
let licencje = {
    "START-YAGA": 1000,
    "TEST-123": 500,
    "PRO-999": 1000
};

// GŁÓWNA STRONA - Dodajemy to, żeby Render nie wyświetlał fioletowej strony
app.get('/', (req, res) => {
    res.send("✅ Serwer licencji YAGA jest ONLINE!");
});

// ŚCIEŻKA SPRAWDZANIA - Tego szuka bot
app.get('/check', (req, res) => {
    const key = req.query.key;
    console.log("Zapytanie o klucz:", key);

    if (licencje[key] !== undefined && licencje[key] > 0) {
        licencje[key] -= 1;
        res.json({ status: "OK", remaining: licencje[key] });
    } else {
        res.json({ status: "ERROR", message: "Brak licencji lub limitu" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serwer aktywny na porcie ${PORT}`);
});
