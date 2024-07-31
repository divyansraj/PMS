const Food = require("../models/ProjectModel");
const cloudinary = require("cloudinary").v2;

//add food Item
exports.addFood = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(Error("Please select a photo to upload "));
    }

    const { name, user, description, category, duedate } = req.body;
    if (!name || !user || !description || !category || !duedate) {
      return next(Error("Name, User, Description and Category is required."));
    }
    let file = req.files.image;
    let result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "food",
    });

    const food = await Food.create({
      name,
      user,
      description,
      category,
      duedate,
      image: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
    });
    res.json({
      success: true,
      message: "Project Added Successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//get all food Items
exports.getallFoodItems = async (req, res, next) => {
  try {
    const food = await Food.find();
    console.log(food);
    res.json({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const { id } = req.body;
    const food = await Food.findById(id);
    if (!food) {
      return next(Error("No user Found"));
    }
    const imageID = food.image.id;
    const photo = await cloudinary.uploader.destroy(imageID);

    const deletedFood = await Food.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Food Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

exports.getFoodDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    if (!food) {
      return next(Error("Food is not present enter correct id"));
    }
    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { projectId, status } = req.body;
    await Food.findByIdAndUpdate(projectId, { status: status });
    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};
