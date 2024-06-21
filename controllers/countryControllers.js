const Country = require('../models/Country');

module.exports = {
  addCountry: async (req, res, next) => {
    const { country, description, imageUrl, region, popular } = req.body;
    try {
      const newCountry = new Country({
        country,
        description,
        imageUrl,
        region,
        popular,
      });
      await newCountry.save();
      res.status(201).json({
        status: true,
        message: 'CONGRATULATIONS COUNTRY DATA ADDED TO DATABASE',
      });
    } catch (error) {
      return next(error);
    }
  },

  getCountries: async (req, res, next) => {
    try {
      const countries = await Country.find(
        {},
        { country: 1, _id: 1, imageUrl: 1 }
      );

      res.status(200).json({ countries });
    } catch (error) {
      return next(error);
    }
  },

  getCountry: async (req, res, next) => {
    const countryId = req.params.id;
    try {
      // createdAt,updatedAt __v will not be appearing in objects retrived from the database
      const country = await Country.findById(countryId, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }).populate({
        path: 'popular',
        // When we are populating we require following five
        select: 'title rating review imageUrl location',
      });
      res.status(200).json(country);
    } catch (error) {
      return next(error);
    }
  },
  addPlacesToCountry: async (req, res, next) => {
    // Capturing data from request body
    const { countryId, placeId } = req.body;
    // Accessing Data base
    try {
      // Find country by Id
      // Acceing model Country and finding by Id
      const country = await Country.findById(countryId);
      if (!country) {
        // if the countryId provided in data base is non-existent
        return res
          .status(404)
          .json({ message: `COUNTRY NOT NOT NOT FOUND FOR ID::: ${countryId}` });


      }

      const index=country.popular.indexOf(placeId);
      if(index!==-1){
        country.popular.splice(index,1)
      }
      else{
        country.popular.push(placeId)
      }
      await country.save();
      res.status(200).json({status:true,
        message: `CONGRATULATIONS PLACE WITH ID ${placeId} HAS BEEN REMOVED
        PLACE WAS `,
      });
    } catch (error) {
      return(next(error));
    }
  },

 
};
