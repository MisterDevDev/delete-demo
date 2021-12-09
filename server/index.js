const path = require("path");
const express = require("express");
const app = express();
const { syncSeed, Company } = require("./db/db");
const faker = require("faker");

const PORT = process.env.PORT || 8080;
const PUBLIC_PATH = path.join(__dirname, "../public");
const DIST_PATH = path.join(__dirname, "../dist");

app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.get('/companies', async(req, res, next) => {
    res.send(await Company.findAll())
})

app.post('/add', async(req, res, next) => {
    res.send(await Company.create({ name: faker.company.companyName() }))
})

app.delete('/delete/:id', async(req, res, next) => {
    const companyToDelete = await Company.findByPk(req.params.id)
    companyToDelete.destroy()
    res.sendStatus(204)
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const init = () => {
  syncSeed()
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
};

init()