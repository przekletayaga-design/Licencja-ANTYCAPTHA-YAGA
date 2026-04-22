const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// TESTOWE POŁĄCZENIE (Główna strona)
app.get('/', (req, res) => {
    res.send("<h1>✅ Serwer YAGA Licencja działa!</h1><p>Użyj /check?key=KOD</p>");
});

let licencje = {
    "START-YAGA": 1000,
    "TEST-123": 500
};

app.get('/check', (req, res) => {
    const key = req.query.key;
    if (licencje[key] && licencje[key] > 0) {
        licencje[key] -= 1;
        res.json({ status: "OK", remaining: licencje[key] });
    } else {
        res.json({ status: "ERROR", message: "Brak licencji" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serwer na porcie ${PORT}`));
