const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Sur Marvel");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// TOUS LES PERSONNAGES sans filtre
// https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=YOUR_API_KEY

app.get("/characters", async (req, res) => {
  try {
    // console.log(req.query);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
    );

    // `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${req.query.name}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//  -----------------------------------PERSONNAGES  + FILTRES-------------------------------------------------- //
//
// https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=YOUR_API_KEY
// app.get("/characters", async (req, res) => {
//   try {
//     // console.log(req.query); // { page: '2', name: 'spider' }

//     let filters = "";
//     if (req.query.name) {
//       filters += `&name=${req.query.name}`;
//     }
//     if (req.query.page) {
//       const skip = (req.query.page - 1) * 100;
//       filters += `&skip=${skip}`;
//     }
//     const response = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}${filters}`
//     );

//     return res.status(200).json(response.data);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// });
//  --------------------------------------------------------------------------------------------------------------- //

//  -----------RECHERCHE PAR ID Personnage pour acces BD-----------

// https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=YOUR_API_KEY

app.get("/comics/:characterId", async (req, res) => {
  try {
    // console.log(req.params.characterId); // 5fcf9519d8a2480017b919cd
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// ----------TOUTES LES BD---------------

app.get("/comics", async (req, res) => {
  try {
    // console.log(req.query);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );

    // `https://lereacteur-marvel-api.herokuapp.com/comicss?apiKey=${process.env.MARVEL_API_KEY}&name=${req.query.name}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// ----------------------------------TOUTES LES BD + filtres

// app.get("/comics", async (req, res) => {
//   try {
//     let filters = "";
//     if (req.query.title) {
//       filters += `&title=${req.query.title}`;
//     }
//     if (req.query.page) {
//       const skip = (req.query.page - 1) * 100;
//       filters += `&skip=${skip}`;
//     }

//     // console.log(req.query);
//     const response = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}=${filters}`);

//     return res.status(200).json(response.data);
// } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// });

app.all("*", (req, res) => {
  return res.status(404).json({ message: "Pas de route" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("serveur started" + PORT + "Youpi");
});
