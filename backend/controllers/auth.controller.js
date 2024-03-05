import User from "../models/user.model.js"


export const login = (req, res) => {
    console.log("loginUser");
}

export const signup = async (req, res) => {
    try {
        const {fullName,username, password, confirmPassword, gender} = req.body;
        
        if(password !== confirmPassword){
            return res.status(400).json({error:"Password dont match"})
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

        // hash password here

        const newUser = new User({
            fullName, 
            username, 
            password, 
            gender,
            // profilePic = "121"
        })

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"})
     }
}

export const logout = (req, res) => {
    console.log("logout");
}
