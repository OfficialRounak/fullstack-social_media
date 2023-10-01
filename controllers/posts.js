import Post from "../models/Posts.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        //creating the post 
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath, //profile pic of the user
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save(); // saving the post

        const post = await Post.find();// finding the all the Posts from the DB
        res.status(201).json(post); // providing all the posts as response


    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

//READ
export const getFeedPosts=async(req,res)=>{
    try{
        const post= await Post.find();
        res.status(200).json(post);

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getUserPosts=async(req,res)=>{
    try{
        const {userId}=req.params;
        const post= await Post.find({userId});
        res.status(200).json(post);

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

//UPDATE

export const likePost=async(req,res)=>{
    try{
        const{id}=req.params;
        const{userId}=req.body;

        const post=await Post.findById(id);//from the id of the post getting to that post
        //now from that post checking whether the user is in the likes map of that post
        const isLiked=post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId); //if there is any val oin isliked , hence the post is already liked by that user,so unliking it
        }else{
            post.likes.set(userId,true);
        }

        const updatedPost= await Post.findByIdAndUpdate(//this updatedPost helps in updating and returning the new post after user has liked or unliked a post. 
            id, //grabing the post again via id 
            {likes:post.likes}, //updating the latest likes
            {new:true} // this creates a new obj for the updated post which we will return as json
        );

        res.status(200).json(updatedPost)

    }catch(error){
        res.status(500).json({message:error.message})
    }

}