import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import User from "../models/User.js";

//register an user


export const register = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)

        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = await req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "user doesnt exits!" });

        const isMatch = await bcrypt.compare(password, user.password); //after getting the user from mongo via email, we are picking up his password through user.password and check that to the req passowrd coming from the body which we destructured.
        if (!isMatch) return res.status(400).json({ msg: "invalid credentials!" });

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}