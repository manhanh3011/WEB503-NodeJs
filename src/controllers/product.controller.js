import Product from "../models/product.model";

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({error: "Không tìm thấy sản phẩm"});
        return res.json(product);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })  
    }
}

export const createOne = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({
            error: "Lỗi khi thêm sản phẩm"
        })
    }
}

export const updateOne = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            error: "Cập nhật sản phẩm thất bại", 
            details: error.message,
        })
    }
}

export const deleteOne = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xoa sản phẩm thành công ",
        })
    } catch (error) {
        return res.status(400).json({
            error: "Xoa sản phẩm thất bại",
            details: error.message,
        })
    }
}