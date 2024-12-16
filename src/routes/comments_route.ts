import express,{Request,Response} from "express";
import commentController from "../controllers/comments_controller";

const router = express.Router();

router.get("/", (req:Request, res:Response) => {
    commentController.getAll(req, res);	
});

router.get("/:id", (req:Request, res:Response) => {
    commentController.getItemById(req, res);	
});

router.post("/", (req: Request, res:Response) => {
    commentController.createItem(req, res);
});

router.delete("/:id", (req:Request, res:Response) => {
    commentController.deleteItem(req, res);
});


export default router;