// Require the model  Places
const Place=require("../models/Places");
module.exports={
    // addPlaces Function to add place in data place
    addPlaces:async (req, res, next) => {
// Capturing the data from the req body
const {
    country_id,description,imageUrl,
    location,title,rating,review,latitude,
    longitude}=req.body;
    try {
    // Creating new Object
        const newPlace= new Place({
            country_id,
            description,
            imageUrl,
            location,
            title,
            rating,
            review,
            latitude,
            longitude});
// Saving newPlace Object  to the database
    await newPlace.save();
    // After saving data to the database we send response
    res.status(201).json({status:true, message:"DATA SUCCESSFULLY SAVED IN DB"})
        } 
        
        
        catch (error) {
   return(next(error));     
    }

    },
    // GET request will be mapped to getPlaces function
    //to get all the places
    getPlaces: async (req,res,next)=>{
        try {
            // New instance of places we get from the database
            const places=await Place.find({},
                // Including , these values will be stored in places variable
                "_id review rating imageUrl title country_id"
            )
            res.status(200).json({places})
        } 
        // if error occurs
        catch (error) {
            return(next(error))
        }
    },


// Function to get single place by id 
    getPlace: async (req,res,next)=>{

// When we need to get a single place we need id
const placeId=req.params.id;
        try {
            // New instance of places we get from the database
            const place=await Place.findById(placeId,
                // Excluding , these values will not included
                //when getting the data 
                {createdAt:0,updatedAt:0,__v:0}
            )
            res.status(200).json({place})
        } 
        // if error occurs
        catch (error) {
            return(next(error))
        }
    },
    getPlacesByCountry: async (req,res,next)=>{
        const countryId = req.params.id;
        try {
            const places=await Place.find({country_id:countryId},{createdAt:0,updatedAt:0,__v:0})

            if(places.length===0){
                return (res.status(200).json([]));
            }
            res.status(200).json({places})
        } catch (error) {
            return(next(error));
        }
    }
}