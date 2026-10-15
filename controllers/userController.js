const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// Create new user
const createUser = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        userModel.createUser(
            username,
            hashedPassword,
            (err, result) => {

                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        message: 'Failed to create user'
                    });
                }

                res.status(201).json({
                    message: 'User created successfully',
                    user_id: result.insertId
                });
            }
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};


// Login user
const loginUser = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    userModel.findUserByUsername(
        username,
        async (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: 'Invalid username or password'
                });
            }

            const user = results[0];

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: 'Invalid username or password'
                });
            }

            req.session.userId = user.user_id;
            req.session.username = user.username;

            res.json({
                message: 'Login successful',
                user_id: user.user_id,
                username: user.username
            });
        }
    );
};


// Logout user
const logoutUser = (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to logout'
            });
        }

        res.json({
            message: 'Logout successful'
        });

    });

};


module.exports = {
    createUser,
    loginUser,
    logoutUser
};
