import { Router } from "express";

const router = Router();

router.get("/home", (req, res) => {
    res.render("pages/home");
});

export default router;
