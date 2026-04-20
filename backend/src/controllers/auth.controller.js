export const register = async (req, res, next) => {
  try {
    // validate input
    // hash password
    // create user
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};