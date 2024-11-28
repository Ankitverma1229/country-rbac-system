import User from '../models/User.js';
import { mailSender } from '../utils/mailSender.js';

// Get current user profile
export const getUsersProfile = async (req, res) => {
    try {
        const users = await User.find({}, 'username email country role _id');
        const allusers = users.map(user => ({
            name: user.username,
            email: user.email,
            country: user.country,
            role: user.role,
            id: user._id
        }))
        res.status(200).json({ success: true, data: allusers,});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving profile', error: error.message });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const updates = req.body;
        const {id} = req.params;
        const role = req.user.role;

        const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the email is the one that should not be updated
    if (user.email === "ankitkumar040722@gmail.com") {
      return res.status(400).json({
        success: false,
        message: "You can't change role of Super Admin"
      });
    }

    if (user.email === req.user.email) {
        return res.status(400).json({
            success: false,
            message: 'You can not modify you own role.'
        })
    }

        if (role !== "Admin" && role !== "Super Admin") {
            return res.status(400).json({
                success: false,
                message: 'Only Admins can update these details'
            })
        };

        if (updates.role && !['Admin', 'Viewer'].includes(updates.role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role specified. Role must be "Admin" or "Viewer".',
            });
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');

        if (!updatedUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: `${updatedUser.username} details updated successfully his role will be ${updatedUser.role}`, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
    }
};

export const sendRequestForAdminRole = async (req, res) => {
  try {
      const { name, email, user_id } = req.user; // Using user_id from req.user.

      if (!name || !email || !user_id) {
          return res.status(400).json({
              success: false,
              message: "User details not available in request.",
          });
      }

      // Fetch the user from the database using user_id
      const user = await User.findById(user_id);

      if (!user) {
          return res.status(404).json({ success: false, message: "User not found." });
      }

      // Check if the user has requested admin role in the last 5 minutes
      const now = new Date();
      const fiveMinutesAgo = new Date(now - 5 * 60 * 1000); // 5 minutes ago

      if (user.lastAdminRequest && user.lastAdminRequest > fiveMinutesAgo) {
          return res.status(400).json({
              success: false,
              message: "Kindly wait for 5 minutes before sending another request. Your previous request is still under review.",
          });
      }

      // Update the lastAdminRequest timestamp
      user.lastAdminRequest = now;
      await user.save();

      // Prepare the email content
      const adminEmail = "ankitkumar040722@gmail.com";
      const title = "Admin Role Request";
      const body = `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p>The above user has requested for the Admin role.</p>
      `;

      // Send the email
      await mailSender(adminEmail, title, body);

      res.status(200).json({
          success: true,
          message: "Request for admin role sent successfully and will be approved soon.",
      });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({
          success: false,
          message: "Error sending request for admin role",
          error: error.message,
      });
  }
};

  