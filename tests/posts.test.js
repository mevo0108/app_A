
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const postsModel = require('../models/posts_model');

const testPosts = [
    {
        title: 'Test Post 1',
        content: 'Test Content 1',
        owner: 'Mevorah'
    },
    {
        title: 'Test Post 2',
        content: 'Test Content 2',
        owner: 'Mevorah2'
    },
    {
        title: 'Test Post 3',
        content: 'Test Content 3',
        owner: 'Mevorah3'
    }
    
]

beforeAll( async () => {
    console.log('Before all tests');
    await postsModel.deleteMany();
});

afterAll(()=>{
    console.log('After all tests');
    mongoose.connection.close();
});

describe("Posts Test" , () => {
    test("Test get all post empty", async () => {
        const response = await request(app).get('/posts');
        expect(response.statusCode).toBe(200);    
        expect(response.body.length).toBe(0);
    });

    test("Test create new post", async () => {
        for(let post of testPosts){
            const response = await request(app).post('/posts').send(post);
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe(post.title);
            expect(response.body.content).toBe(post.content);
            expect(response.body.owner).toBe(post.owner);

            post._id = response.body._id;
        }
    });

    test("Test get all posts full", async () => {
        const response = await request(app).get('/posts');
        expect(response.statusCode).toBe(200);    
        expect(response.body.length).toBe(testPosts.length);
    });

    test("Test get post by id", async () => {
        const response = await request(app).get(`/posts/` + testPosts[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testPosts[0]._id);
        });

    test("Test filter post by owner", async () => {
        const response = await request(app).get(`/posts?owner=` + testPosts[0].owner);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        
    });
});
