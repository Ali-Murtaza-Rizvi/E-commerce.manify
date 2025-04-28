


const isAdmin = (req, res, next) => {
    // Check if the user exists and has admin privileges
    if (req.user && req.user.isAdmin) {
        next(); // User is an admin, proceed to the next middleware or controller
    } else {
        res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }
};

module.exports = isAdmin;
