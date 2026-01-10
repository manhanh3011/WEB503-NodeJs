import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", () => {
//     console.log("Home page");
// });

const products = [
    {id: 1, name: "Sản phẩm 1", price: 200},
    {id: 2, name: "Sản phẩm 2", price: 200},
    {id: 3, name: "Sản phẩm 3", price: 200},
];

//lấy danh sách sản phẩm
app.get("/products", (req, res) => {
    return res.json(products);
})

//Lấy 1 sản phẩm
app.get("/products/:id", (req, res) => {
    const product = products.find(product => product.id == req.params.id);
    if(!product){
        return res.status(404).json({
            messge: "Không tìm thấy sàn phẩm nào"
        })
    };
    return res.json(product);
})

//thêm sản phẩm
app.post("/products", (req, res) => {
    const product = { id: products.length + 1, ...req.body};
    products.push(product);
    return res.status(201).json(products);
})

//cập nhật
app.put("/products/:id", (req, res) => {
    const product = products.find(product => product.id == req.params.id);
    if(!product){
        return res.status(404).json({
            messge: "Không tìm thấy sản phẩm"
        });
    }
    
    const {name, price} = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
})


app.delete("/products/:id", (req, res) => {
    // tìm index của sản phẩm
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    // nếu không tìm ra index thì trả về 404
    if (index === -1) return res.status(404).json({ error: "Products not found" });

    // Xóa sản phẩm
    products.splice(index, 1);
    // trả về phía client
    return res.json({ success: true });
});



app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
})

