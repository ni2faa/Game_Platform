const fs = require('fs');
const path = require('path');
const asyncErrorHandler = require('../middlewares/helpers/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Get All Assets
exports.getAllAssets = asyncErrorHandler(async (req, res, next) => {
    try {
        // Resolve path to mock-assets.json in public folder
        const filePath = path.join(__dirname, '../../public/mock-assets.json');

        // Read file synchronously (since it's a static file, sync is fine)
        const fileData = fs.readFileSync(filePath, 'utf8');
        let assets = JSON.parse(fileData);

        // Filter by owner if query parameter is provided
        const owner = req.query.owner;
        if (owner) {
            assets = assets.filter(asset => 
                asset.owner && asset.owner.toLowerCase() === owner.toLowerCase()
            );
        }

        res.status(200).json({
            success: true,
            data: assets,
        });
    } catch (error) {
        // Handle file read or JSON parse errors
        return next(new ErrorHandler("Failed to load assets", 500));
    }
});

