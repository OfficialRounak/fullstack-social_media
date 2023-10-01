import User from '../models/User';

//READ USER

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (error) {
        res.this.status(500).json({ error: error.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = User.findById(id);

        const friends= await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );

        const formattedFriends = friends.map(({_id,
            firstName,
            lastName,
            occupation , 
            location,
            picturePath})=>{
            return {
                _id,
                firstName,
                lastName,
                occupation , 
                location,
                picturePath
            }
        })
        res.status(200).json(formattedFriends);


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const addRemoveFriends=async(req,res)=>{
    try{
        const { id , friendId}=req.params;
        const user=await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friend)){
            user.friends= user.friends.filter((id)=> id!=friendId);
            friend.friends = friend.friends.filter((id)=> id!== id);
        }

        

    }catch(error){
        res.status(500).json({error: error.message})
    }

}