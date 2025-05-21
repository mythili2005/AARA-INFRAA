const express = require('express');
const router = express.Router();

// Hardcoded admin credentials (replace with env vars in production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({
      admin: { email },
      message: 'Admin login successful',
    });
  } else {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }
});

module.exports = router;
