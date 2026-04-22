const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// TWOJA BAZA
let licencje = { "START-YAGA": 1000 };

// GŁÓWNA STRONA - Jeśli to zobaczysz w X-RAY, to wygrałeś
app.get('/', (req, res) => {
    res.send("YAGA_SERVER_IS_ACTIVE");
});

app.get('/check', (req, res) => {
    const key = req.query.key;
    if (licencje[key]) {
        // Nie odejmujemy punktu przy samym sprawdzaniu stanu
        res.json({ status: "OK", remaining: licencje[key] });
    } else {
        res.json({ status: "ERROR" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serwer ruszył na porcie " + PORT));
