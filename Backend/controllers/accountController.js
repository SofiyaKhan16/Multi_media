import BaseController from './baseController.js';
import User from '../models/user.js';
import { generateJwtToken } from '../utils/index.js';
import dotenv from 'dotenv';
dotenv.config();

const baseAccountController = new BaseController(User);

export const getAllAccounts = baseAccountController.getAll;
export const getAccount = baseAccountController.getById;

export const verifyGoogleToken = async (req, res) => {
    try {
        const { token } = req.params;
        
        if (!token) {
            return res.status(400).json({ 
                message: "ID token is required" 
            });
        }

        const googleTokenInfoUrl = `${process.env.GOOGLE_TOKENINFO_URL}${token}`;
        const tokenInfoResponse = await fetch(googleTokenInfoUrl);
        
        if (!tokenInfoResponse.ok) {
            return res.status(401).json({ 
                message: "Invalid ID token" 
            });
        }

        const tokenInfo = await tokenInfoResponse.json();

        if (!tokenInfo || !tokenInfo.email) {
            return res.status(401).json({ 
                message: "Token does not belong to this app" 
            });
        }

        const email = tokenInfo.email;
        let username = email.split('@')[0];
        username = username.replace(/[^a-zA-Z0-9_.]/g, '_');
        const profilePicture = tokenInfo.picture || null;

        let user = await User.findOne({ email: email });

        if (!user) {
            user = new User({
                username: username,
                email: email,
                profilePicture: profilePicture
            });

            try {
                await user.save();
            } catch (error) {
                return res.status(400).json({ 
                    message: "Error creating user", 
                    error: error.message 
                });
            }
        } else {
            if (profilePicture && user.profilePicture !== profilePicture) {
                user.profilePicture = profilePicture;
                await user.save();
            }
        }

        const jwtToken = generateJwtToken(user);

        return res.status(200).json({
            message: "Token is valid",
            token: jwtToken
        });

    } catch (error) {
        console.error('Error verifying Google token:', error);
        return res.status(500).json({
            message: "Error verifying token",
            error: error.message
        });
    }
};