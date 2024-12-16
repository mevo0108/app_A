import express,{Request,Response} from "express";
import postsController from "../controllers/posts_controller";

const router = express.Router();

router.get("/", postsController.getAllPosts);

router.get("/:id", (req:Request, res:Response) => {
    postsController.getPostById(req, res);	
});

router.post("/", postsController.createPost);

router.delete("/:id", postsController.deletePost);


export default router;