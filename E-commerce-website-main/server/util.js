import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = (req, res, next) => {
  const token = req.headers.authorization;


  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not supplied." });
  }
};

export const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};
