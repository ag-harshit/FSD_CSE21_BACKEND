import express from "express";
import fs from "fs";
const product = express();
product.use(express.json());
const file = "./prod.json";

let items = JSON.parse(fs.readFileSync(file, "utf-8"));

product.get("/items", (req, res) => {
    res.json(items);
});
product.post("/items", (req, res) => {

    let newItem = {
        id: items.length + 1,
        name: req.body.name,
        price: req.body.price,
        inStock: req.body.inStock
    };
    items.push(newItem);
    fs.writeFileSync(
        file,
        JSON.stringify(items, null, 2)
    );

    res.json(newItem);
});
product.put("/items/:id", (req, res) => {

    let newItem = items.find(
        p => p.id == req.params.id
    );

    if (!newItem) {
        return res.status(404).send("Item not found");
    }

    newItem.name = req.body.name;
    newItem.price = req.body.price;
    newItem.inStock = req.body.inStock;

    fs.writeFileSync(
        file,
        JSON.stringify(items, null, 2)
    );

    res.json(newItem);
});
product.delete("/items/:id", (req, res) => {

    items = items.filter(
        p => p.id != req.params.id
    );

    fs.writeFileSync(
        file,
        JSON.stringify(items, null, 2)
    );

    res.send("Item deleted successfully!");
});

product.listen(2000, () => {
    console.log("Server is running on http://localhost:2000");
});