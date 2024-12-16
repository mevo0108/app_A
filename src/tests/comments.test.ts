
import request from 'supertest';
import appInit from '../server';
import mongoose from 'mongoose';
import commentsModel from '../models/comments_model';
import testComments from './test_comments.json';




let app=null;

beforeAll( async () => {
    console.log('init app');
    app = await appInit();
    console.log('Before all tests');
    await commentsModel.deleteMany();
});

afterAll( async ()=>{
    console.log('After all tests');
    await mongoose.connection.close();
});

describe("Comments Test", () => {
    test("Test create new comment", async () => {
        for(const comment of testComments){
            const response = await request(app).post('/comments').send(comment);
            expect(response.statusCode).toBe(201);
            expect(response.body._id).toBe(comment._id);
            expect(response.body.comment).toBe(comment.comment);
            expect(response.body.owner).toBe(comment.owner);

            comment._id = response.body._id;
        }
    });
    test("Test get comments by id", async () => {
        const response = await request(app).get(`/comments/` + testComments[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testComments[0]._id);
    });

    test("Test create new comment fail", async () => {

        const response = await request(app).post('/comments').send({
            owner: 'Mevorah',
            PostId: 'good comment',
        });
        expect(response.statusCode).toBe(400);
    });
});
   
/*
    test("Test Delete post by id", async () => {
        const response = await request(app).delete(`/posts/` + testPosts[0]._id);
        expect(response.statusCode).toBe(200);
        
        const responseGet = await request(app).get(`/posts` + testPosts[0]._id);
        expect(responseGet.statusCode).toBe(404);
    });

    test("Test create new post fail", async () => {

        const response = await request(app).post('/posts').send({
            title: 'Test Post 1',
            content: 'Test Content 1',
        });
        expect(response.statusCode).toBe(400);
*/
