import { Router } from "express";
import { signIn, restricted } from "../controller/controller.js";
import path from "path";

const __dirname = path.resolve();

const router = Router();

router.get("/", (req, res) => {
   res.sendFile(__dirname + "/views/index.html");
});

router.get("/SignIn", signIn);

router.get("/restricted", restricted);

export default router;
