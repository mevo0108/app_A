import express, {Request,Response, NextFunction} from "express";
import postController from "../controllers/posts_controller";
import {authMiddleware} from "../controllers/auth_controller";
const router = express.Router();

router.get("/", postController.getAll.bind(postController));
router.get("/:id", (req:Request, res:Response) => {
    postController.getItemById(req, res);	
});


router.post("/",authMiddleware,postController.createItem.bind(postController));

router.delete("/:id", authMiddleware, (req:Request, res:Response) => {
    postController.deleteItem(req, res);
});


export default router;