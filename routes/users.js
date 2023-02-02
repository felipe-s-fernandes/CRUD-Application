import express from "express";
import {
    postUser,
    getUsers,
    patchUser,
    deleteUser,
} from "../controllers/controller.js";

const router = express.Router();

router.post("/", postUser);
router.get("/", getUsers);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;
