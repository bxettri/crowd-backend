const axios = require("axios");
const baseurl = "http://localhost:3002/users"

describe("Users Route Test", () => {
    let token;
    test("sign up of new user", () => {
        return axios
            .post(baseurl + "/signup", {
                fullName: 'Bvek Xettri',
                phone: '1234567890',
                email: 'xettri32@gmail.com',
                address: 'kathmandu',
                username: 'test12345',
                password: 'test12345'
            })
            .then(response => {
                expect(response.data.status).toMatch("Signup success!");
            })
            .catch(err => { });
    });

    test("login of existing user", () => {
        return axios
            .post(baseurl + "/login", {
                email: "xettri32@gmail.com",
                password: "test12345"
            })
            .then(response => {
                token = response.data.token;
                expect(response.status).toBe(200);
                expect(response.data.status).toMatch("Login Successful!");
            })
            .catch(err => { });
    });
});




