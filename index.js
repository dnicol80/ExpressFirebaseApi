import express from "express";
import bodyParser from "body-parser";
const miApp = express();

import { getProductos, saveProductos, getAllProducts,updateProduct,deleteProduct } from "./db.js";

miApp.use(bodyParser.urlencoded({ extended: true }));
miApp.use(bodyParser.json());
var jsonParser = bodyParser.json();

const port = process.env.PORT || 3000;

miApp.listen(port, () => {
  console.log("El servidor está inicializado en el puerto ${port}");
});

miApp.post("/productos", jsonParser, function (req, res) {
  saveProductos(req.body.id, req.body.descripcion, req.body.mostrar)
    .then(res.status(200).send("OK"))
    .catch((e) => res.status(500).send());
});

miApp.get("/productos", function (req, res) {
  if (Object.keys(req.query).length === 0) {
    console.log("Empty request, return all");
    getAllProducts()
      .then((productos) => res.status(200).send(productos))
      .catch((e) => res.status(404).send(e));
    return;
  }
  let id = req.query.id;
  getProductos(id)
    .then((producto) => res.status(200).send(producto))
    .catch((e) => res.status(404).send());
});

miApp.put("/productos", jsonParser, function (req, res) {
    console.log('Initi update')
    updateProduct(req.body.id, req.body.descripcion, req.body.mostrar)
      .then(res.status(200).send("OK"))
      .catch((e) => res.status(500).send());
  });

  miApp.delete("/productos", function (req, res) {
    let id = req.query.id;
    deleteProduct(id)
      .then(res.status(200).send("OK"))
      .catch((e) => res.status(500).send(e));
  });
