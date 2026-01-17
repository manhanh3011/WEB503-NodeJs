import Product from "../models/product.model";
import Joi from "joi";



//lấy danh sách
export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.json(500).json({
            error: error.messege,
        })
    }
};

//lấy 1 sản phẩm
export const getOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(400).json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.json(500).json({
            messege: "Không có sản phẩm nào",
            error: error.messege,
        })
    }
};

//thêm sản phẩm
export const createOne = async (req, res) => {
    try {
        //validate
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json(error.details.map(item => item.message))
        }

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
export const updateOne = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(product);
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi khi cập nhật sản phẩm",
            error: error.message,
        });
    }
};

//xoá
export const deleteOne = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xoá sản phẩm thành công",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi khi xoá sản phẩm",
            error: error.message,
        });
    }
};

