import { Router } from "express";
import { registration, login } from "../controllers/authController";
import { newContent, content, deleteContent, shareContent } from "../controllers/crudController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

router.get("/content", isAuthenticated, content);
router.post("/signup", registration);
router.post("/signin", login);
router.post("/addcourse", isAuthenticated, newContent);
router.delete("/delete/:contentId", isAuthenticated, deleteContent);
router.get("/share", isAuthenticated, shareContent);

export default router;