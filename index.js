const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

let licencje = { "START-YAGA": 1000 };

app.get('/check', (req, res) => {
    const key = req.query.key;
    if (licencje[key]) {
        licencje[key] -= 1;
        res.json({ status: "OK", remaining: licencje[key] });
    } else {
        res.json({ status: "ERROR", message: "Zly klucz" });
    }
});

// To musi być na samym końcu:
app.get('*', (req, res) => res.send("Serwer dziala, ale wejdz w /check?key=START-YAGA"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serwer ruszy"));
