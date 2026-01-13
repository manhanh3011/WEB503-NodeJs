import Product from "../models/product.model";

//lấy danh sách
export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.json(500).json({
            messege: "Lỗi khi lấy danh sách sản phẩm",
            error: error.messege,
        })
    }
};

//lấy 1 sản phẩm
export const getOne = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.json(500).json({
            messege: "Lỗi khi lấy danh sách sản phẩm",
            error: error.messege,
        })
    }
};

//thêm sản phẩm
export const createOne = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({
            messege: "Lỗi khi tạo sản phẩm",
            error: error.messege,
        })
    }
};

//cập nhật
export const updateOne = (req, res) => {
    const product = products.find(product => product.id == req.params.id);
    if(!product){
        return res.status(404).json({
            messge: "Không tìm thấy sản phẩm"
        });
    }
    
    const {name, price} = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
};

//xoá
export const deleteOne = (req, res) => {
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    // nếu không tìm ra index thì trả về 404
    if (index === -1) return res.status(404).json({ error: "Products not found" });

    // Xóa sản phẩm
    products.splice(index, 1);
    return res.json({ success: true });
};

