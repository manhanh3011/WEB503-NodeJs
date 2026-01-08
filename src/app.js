import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

// app.get("/", () => {
//     console.log("Home page");
// });

const products = [
    {id: 1, name: "áo dài", price: 200},
    {id: 2, name: "áo dài", price: 200},
    {id: 3, name: "áo dài", price: 200},
];

app.get("/products", (req, res) => {
    return res.json(products);
})

app.get("/products/:id", (req, res) => {
    const product = products.find(product => product.id == req.params.id);
    if(!product){
        return res.status(404).json({
            messge: "Không tìm thấy sàn phẩm nào"
        })
    };
    return res.json(product);
})

// // GET /greet?name=
// app.get("/greet", (req, res) => {
//     const name = req.query.name || "bạn";
//     res.json({messege: `Xin chào ${name}!`})
// });


app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
})

