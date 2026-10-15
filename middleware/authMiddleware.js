const requireLogin = (req, res, next) => {

    if (!req.session.userId) {
        return res.status(401).json({
            message: 'Access denied. Please login first.'
        });
    }

    next();
};

module.exports = requireLogin;