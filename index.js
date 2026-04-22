const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

let licencje = { "START-YAGA": 1000 };

// Ta linia sprawi, że zamiast strony Rendera zobaczysz swój napis
app.get('/', (req, res) => {
    res.send("<h1>SERWER YAGA DZIALA</h1>");
});

app.get('/check', (req, res) => {
    const key = req.query.key;
    if (licencje[key]) {
        licencje[key] -= 1;
        res.json({ status: "OK", remaining: licencje[key] });
    } else {
        res.json({ status: "ERROR", message: "Zly klucz" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Serwer ruszył na porcie " + PORT);
});
