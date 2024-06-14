import jwt from "jsonwebtoken";
import { data } from "../data/agentes.js";

export const signIn = (req, res) => {
   const secretKey = process.env.JWT_SECRET_KEY;
   try {
      const { email, password } = req.query;
      //check if the user exists
      const user = data.find(
         (x) => x.email === email && x.password === password
      );
      if (!user) {
         return res.status(401).send("Invalid Credentials");
      }
      console.log("user", user);
      //create a token
      const token = jwt.sign({ email }, secretKey, { expiresIn: "2m" });

      res.cookie("token", token, {
         httpOnly: true,
         maxAge: 120000,
      }).send(`<p>Login successful for ${user.email}</p>
         <a href="/restricted">Go to Restricted Page</a>`);
   } catch (error) {
      console.log(error.message);
   }
};

export const restricted = (req, res) => {
   try {
      const secretKey = process.env.JWT_SECRET_KEY;

      const token = req.cookies.token;
      const email = jwt.verify(token, secretKey);

      if (!email) {
         return res
            .status(401)
            .send({ error: "401 Unauthorized", message: "No token" });
      }
      res.send(`<p>You are logged in as ${email.email}</p>`);
   } catch (error) {
      res.status(401).send({ error: "Unauthorized", message: error.message });
   }
};
