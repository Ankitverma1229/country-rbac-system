import Data from "../models/Data.js";
import User from "../models/User.js";
import joiDataValidator from "../validators/dataValidators.js";

// Create new data entry
export const createData = async (req, res) => {
  try {
    // Validate request body
    const { error } = joiDataValidator(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        errors: error.details.map((err) => err.message),
      });
    }

    const {
      title,
      country,
      description,
      population,
      gdp,
      popularCities,
      mainLanguages,
      eventCalendar,
      weather,
    } = req.body;
    const { role, user_id } = req.user;

    // Check user role
    if (!["Admin", "Super Admin"].includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Only admins can add these details",
      });
    }

    // Check if country details already exist
    const existingData = await Data.findOne({ country });
    if (existingData) {
      return res.status(400).json({
        success: false,
        message: `Details for ${country} already exist. Try another one.`,
      });
    }

    // Create new data entry
    const dataEntry = new Data({
      title,
      description,
      country,
      createdBy: user_id,
      population,
      gdp,
      popularCities,
      mainLanguages,
      eventCalendar,
      weather,
    });

    await dataEntry.save();
    return res.status(201).json({
      success: true,
      message: `Details for ${country} added successfully`,
      data: dataEntry,
    });
  } catch (error) {
    console.error("Error creating data:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating data",
      error: error.message,
    });
  }
};


// Get data by user’s country
export const getDataByCountry = async (req, res) => {
  try {
    const { country } = req.query; // Check if `country` is passed from the request body
    const { user_id, country: userCountry, role } = req.user; // Extract the user's country from the JWT payload
    if (country) {
      // If `country` is provided in the request body
      const dataEntry = await Data.findOne({ country });
      if (!dataEntry) {
        return res.status(400).json({
          success: false,
          message: `Cannot find details for ${country}. Try with another country.`,
        });
      }

      // Update user's country profile if this country is different from their profile country
      if (country !== userCountry) {
        await User.findByIdAndUpdate(user_id, { country });
      }

      return res.status(200).json({
        success: true,
        data: dataEntry,
        role: role,
        country: userCountry
      });
    } else if (userCountry) {
      // If no `country` is passed in the body but there's a `country` in the user's profile
      const dataEntry = await Data.findOne({ country: userCountry });
      if (!dataEntry) {
        return res.status(400).json({
          success: false,
          message: `Cannot find details for ${userCountry}.`,
        });
      }

      return res.status(200).json({
        success: true,
        data: dataEntry,
        role: role
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving data",
      error: error.message,
    });
  }
};

//getAllCountry
export const getAllCountry = async (req, res) => {
  const role = req.user.role;
  const country = req.user.country;
  try {
    const allCountryDetails = await Data.find();
    return res.status(200).json({
      success: true,
      data: allCountryDetails,
      role: role,
      country: country
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving data",
      error: error.message,
    });
  }
};

// Update data (Admin-only)
export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.user.role !== "Admin" && req.user.role !== "Super Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied only admins can update",
      });
    }

    const updatedData = await Data.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json({ success: true, message: 'Details updated successfully', data: updatedData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating data",
      error: error.message,
    });
  }
};

// Delete data (Admin-only)
export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "Admin" && req.user.role !== "Super Admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // Find the country details to be deleted
    const dataToDelete = await Data.findById(id);
    if (!dataToDelete) {
      return res.status(404).json({
        success: false,
        message: "Country data not found",
      });
    }

    // Get the country name from the data entry
    const { country } = dataToDelete;

    // Update all users with the matching country and set their country field to empty
    await User.updateMany({ country }, { $set: { country: '' } });

    // Delete the country data from the Data model
    await Data.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Data for ${country} deleted successfully, and users' country updated.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting data",
      error: error.message,
    });
  }
};

