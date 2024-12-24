import express,{Request,Response} from "express";
import commentsController from "../controllers/comments_controller";

const router = express.Router();

router.get("/",commentsController.getAll.bind(commentsController));

router.get("/:id", (req:Request, res:Response) => {
    commentsController.getItemById(req, res);	
});

router.post("/",commentsController.createItem.bind(commentsController));

router.delete("/:id", (req:Request, res:Response) => {
    commentsController.deleteItem(req, res);
});


export default router;