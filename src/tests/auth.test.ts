
import request from 'supertest';
import appInit from '../server';
import mongoose from 'mongoose';
import userModel from '../models/user_model';





let app=null;

beforeAll( async () => {
    app = await appInit();
    await userModel.deleteMany();
});

afterAll( async ()=>{
    console.log('After all tests');
    await mongoose.connection.close();
});

type UserInfo = {
    email: string,
    password: string,
    token?: string,
    _id?: string
}

const userInfo:UserInfo = {
    email:"berrrebimevo@gmail.com",
    password: "123456"
}


describe("Auth Tests", () => {
    
    test("Auth Registration", async () => {
        const response = await request(app).post('/auth/register').send(userInfo);
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });

    test("Auth Login", async () => {
        const response = await request(app).post('/auth/login').send(userInfo);
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        const token = response.body.token;
        expect(token).toBeDefined();
        const userId = response.body._id;
        expect(userId).toBeDefined();
        userInfo.token = token;
        userInfo._id = userId;
    });

    test("Get protected API", async () => {
        const response = await request(app).post("/posts").send({
            owner: userInfo._id,
            title: "My First Post",
            content: "This is my first post"
        });
        expect(response.statusCode).not.toBe(201);
        const response2 = await request(app).post("/posts").set({
            authorization: `jwt` + userInfo.token
        }).send({
            owner: userInfo._id,
            title: "My First Post",
            content: "This is my first post"
        });
        expect(response2.statusCode).toBe(201);
    });

    



});