import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("PassPort Inc Auth API funcionando ✅");
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});