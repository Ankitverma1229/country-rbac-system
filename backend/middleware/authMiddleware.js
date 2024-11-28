import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({ success: false, message: 'Login before accessing this feature' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Attach user info to the request object
        req.user = {
            user_id: user._id,
            email: user.email,
            role: user.role,
            country: user.country,
            image: user.image,
            name: user.username
        };

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Authentication failed', error: error.message });
    }
};
