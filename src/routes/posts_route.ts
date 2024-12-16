import express, {Request,Response} from "express";
import postController from "../controllers/posts_controller";

const router = express.Router();

router.get("/", (req:Request, res:Response) => {
    postController.getAll(req, res);	
});
router.get("/:id", (req:Request, res:Response) => {
    postController.getItemById(req, res);	
});

router.post("/", (req: Request, res:Response) => {
    postController.createItem(req, res);
});

router.delete("/:id",(req:Request, res:Response) => {
    postController.deleteItem(req, res);
});


export default router;