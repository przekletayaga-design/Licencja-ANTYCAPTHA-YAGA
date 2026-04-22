const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// TA LINIA JEST KLUCZOWA - zabija stronę powitalną Rendera
app.get('/', (req, res) => res.send({status: "OK", info: "YAGA LIVE"}));

let licencje = { "START-YAGA": 1000 };

app.get('/check', (req, res) => {
    const key = req.query.key;
    if (licencje[key]) res.json({ status: "OK", remaining: licencje[key] });
    else res.json({ status: "ERROR" });
});

app.listen(process.env.PORT || 3000);
