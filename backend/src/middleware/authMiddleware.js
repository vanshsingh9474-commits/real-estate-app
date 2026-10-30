const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// 1. Clerk Token Verify karne ke liye middleware
exports.verifyToken = ClerkExpressRequireAuth({
  // Yeh automatically Authorization header se Clerk token uthakar verify kar lega
});

// 2. Admin Role Check (Agar aapko alag se role check karna hai)
exports.isAdmin = (req, res, next) => {
  // Clerk me roles metadata me hote hain, ya aap apne hisab se check kar sakte hain
  try {
    if (req.auth && req.auth.userId) {
      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    res.status(403).json({ error: 'Access denied.' });
  }
};