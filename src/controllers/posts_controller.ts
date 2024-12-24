import postModel,{iPost} from "../models/posts_model";
import createController from "./base_controller";


const postController = createController<iPost>(postModel);


export default postController;
