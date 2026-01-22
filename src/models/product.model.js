
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            maxlength: 200
        },
        price: {
            type: Number,
            require: true,
            min: 0
        },
        description: {
            type: String,
            require: true
        },
        images: {
            type: String,
        },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        }
    },
     {timestamps: true, versionKey: false}
);

const Product = mongoose.model("Product", productSchema);
export default Product;