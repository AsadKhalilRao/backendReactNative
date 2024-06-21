const User=require("../models/User");
module.exports={
  deleteUser:async (req, res, next)=>{
try {
  await User.findByIdAndDelete(req.user.id)
  res.status(200).json({status:true, message:"Congratulations the User has successfully DELETED DELETED DELETED"})
} catch (error) {
 return next(error) 
}
  },
  getUser:async (req,res, next )=>{
    const user_id=req.user.id;
    console.log("The user Id is ",user_id);
    try {
      const user=await User.findById({
        _id:user_id
      },{
        password:0,
        // Make sure that there are double underscore
        // It wont appear on the response
        __v:0,
        createdAt:0,
        updatedAt:0,
      })
      if(!user){
        return (res.status(401).json({status:false,message:"User Not EXISTING"}))
      }
      res.status(200).json(user)


    } catch (error) {
     next(error); 
    }
  }
}