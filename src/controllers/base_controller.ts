import { Request, Response } from "express";
import { AnyObject } from "mongoose";

class BaseController{
    model: AnyObject; //need to import model type from mongoose - do later
    constructor(model: AnyObject){
        this.model = model;
    }
    async getAll(req:Request, res:Response){
        const ownerFilter = req.query.owner;
        try {
            if (ownerFilter) {
                const posts = await this.model.find({owner:ownerFilter});
                res.status(200).send(posts);
            } else {
                const posts = await this.model.find();
                res.status(200).send(posts);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    
    async getItemById(req:Request, res:Response){
        const id = req.params.id;
        try {
            const m = await this.model.findById(id);
            if(m == null) {
                return res.status(404).send("Item not found");
            }else {
                return res.status(200).send(m);
            }
        }catch (error) {
            res.status(400).send(error.message);
        }
    };
    async createItem(req:Request, res:Response){
        try{
            const data = await this.model.create(req.body);
            res.status(201).send(data);
        }catch(error){
            res.status(400).send(error);
        }
    };
    async deleteItem(req:Request, res:Response){
        const id = req.params.id;
        try{
            await this.model.findByIdAndDelete(id);
            res.send("Item deleted");
        }catch(error){
            res.status(400).send(error);
        }
    };
};
export default BaseController;