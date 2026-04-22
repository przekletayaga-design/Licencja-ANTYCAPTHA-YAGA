const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// TWOJA BAZA KLUCZY (Klucz: Liczba użyć)
// Możesz tu dopisywać nowe klucze dla klientów
let licencje = {
    "START-YAGA": 100,
    "TEST-123": 50,
    "PRO-999": 1000
};

// Sprawdzanie i odejmowanie użycia przez bota
app.get('/check', (req, res) => {
    const key = req.query.key;
    if (licencje[key] && licencje[key] > 0) {
        licencje[key] -= 1; 
        console.log(`✅ Klucz ${key} użyty. Zostało: ${licencje[key]}`);
        res.json({ status: "OK", remaining: licencje[key] });
    } else {
        res.json({ status: "ERROR", message: "Brak licencji lub limitu" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serwer licencji działa na porcie ${PORT}`));
