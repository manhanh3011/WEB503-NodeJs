import {asyncHandler} from "../utils/asyncHandler";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async(req, res) => {
    //lấy dưc liệu từ client
    const {username, email, password} = req.body;
    //kiểm tra email
    const userExits = await User.findOne({email});
    if(userExits){
        return res.status(400).json({
            messege: "Email đã tồn tại",
        })
    }
    //mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    //lưu CSDL
    const user = await User.create({username, email, password: hashedPassword});
    user.password = undefined;
    return user;
})

export const login = asyncHandler(async(req, res) => {

})