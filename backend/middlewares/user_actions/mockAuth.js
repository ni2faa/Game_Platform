const ErrorHandler = require('../../utils/errorHandler');
const asyncErrorHandler = require('../helpers/asyncErrorHandler');

// Hardcoded mock token
const MOCK_TOKEN = 'mock-token-123';

exports.isAuthenticatedWithMockToken = asyncErrorHandler(async (req, res, next) => {
    let token = null;

    // Check Authorization header (Bearer token format)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }

    // If not in header, check query parameter
    if (!token && req.query.token) {
        token = req.query.token;
    }

    if (!token) {
        return next(new ErrorHandler("Please provide a token to access this resource", 401));
    }

    if (token !== MOCK_TOKEN) {
        return next(new ErrorHandler("Invalid token", 401));
    }

    // Set mock user data for consistency with other auth middleware
    req.user = {
        id: 'mock-user-id',
        role: 'user'
    };

    next();
});

