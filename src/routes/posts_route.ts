import express, {Request,Response} from "express";
import postController from "../controllers/posts_controller";

const router = express.Router();

router.get("/", postController.getAll.bind(postController));
router.get("/:id", (req:Request, res:Response) => {
    postController.getItemById(req, res);	
});

router.post("/", postController.createItem.bind(postController));

router.delete("/:id",(req:Request, res:Response) => {
    postController.deleteItem(req, res);
});


export default router;