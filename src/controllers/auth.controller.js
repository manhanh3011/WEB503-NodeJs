import {asyncHandler} from "../utils/asyncHandler";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = asyncHandler(async(req, res) => {
    //lấy dưc liệu từ client
    const {username, email, password} = req.body;
    //kiểm tra email
    const userExits = await User.findOne({email});
    if(userExits){
        return res.status(400).json({
            error: "Email đã tồn tại",
        })
    }
    //mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    //lưu CSDL
    const user = await User.create({username, email, password: hashedPassword});
    user.password = undefined;
    return res.status(201).json(user);
});

export const signin = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            error: "Email không tồn tại",
        })
    };

    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword){
        return res.status(400).json({
            error: "Mật khẩu không đúng",
        })
    };

    const token = jwt.sign({email: user.email, role: user.role}, "123456", {expiresIn: "1h"});
    user.password = undefined;
    return res.status(200).json({
        data: user, token
    })
})