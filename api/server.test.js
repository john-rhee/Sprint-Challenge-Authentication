const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig.js");

beforeAll(async () => {
    await db("users").truncate();
});

    it("should register", function() {
        
        return request(server)
        .post("/api/auth/register")
        .send({ username: "john", password: "pass" })
        .then(res => {
            expect(res.status).toBe(201);
        });
    });

    it("should register different user", function() {
        
        return request(server)
            .post("/api/auth/register")
            .send({ username: "frank", password: "pass2" })
            .then(res => {
            expect(res.status).toBe(201);
            });
        }); 

    it("should login", function() {

        return request(server)
            .post("/api/auth/login")
            .send({ username: "frank", password: "pass2" })
            .then(res => {
            expect(res.status).toBe(200);
            });
        });
    
    it("should login with different user", function() {
    
    return request(server)
        .post("/api/auth/login")
        .send({ username: "john", password: "pass" })
        .then(res => {
        expect(res.status).toBe(200);
        });
    });    
    
       

  
