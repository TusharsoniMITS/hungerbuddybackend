const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "HungerBuddy",
            resource_type: "image",
            quality: "auto",
            fetch_format: "auto"
        });

        // return result.secure_url;
        return result.public_id.split("/").pop();
        // return result.public_id
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
};

module.exports = uploadToCloudinary;