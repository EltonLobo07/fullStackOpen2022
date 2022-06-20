const app = require("../app");
const supertest = require("supertest");
const User = require("../models/user");
const { initialUsers } = require("./test_helper");

const timeoutTime = 100000;

const api = supertest(app);

describe("username and password validations", () => {
	test("when no username given, returns 400 status code and does not modify the database", async () => {
		const newUser = {password : "12345678", name : "John Smith"};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400);

		const res = await api.get("/api/users");

		expect(res.body.length).toBe(initialUsers.length);

	}, timeoutTime);

	test("when no password given, returns 400 status code and does not modify the database", async () => {
		const newUser = {username : "Monster123", name : "John Smith"};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400);

		const res = await api.get("/api/users");

		expect(res.body.length).toBe(initialUsers.length);

	}, timeoutTime);

	test("when username given is less than 3 characters, returns 400 status code and does not modify the database", async () => {
		const newUser = {username : "My", password : "12345678", name : "John Smith"};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400);

		const res = await api.get("/api/users");

		expect(res.body.length).toBe(initialUsers.length);

	}, timeoutTime);

	test("when password given is less than 3 characters, returns 400 status code and does not modify the database", async () => {
		const newUser = {username : "ily", password : "11", name : "Elton Lobo"};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400);

		const res = await api.get("/api/users");

		expect(res.body.length).toBe(initialUsers.length);

	}, timeoutTime);

	test("when username is not unique, returns 400 status code and does not modify the database", async () => {
		const newUser = {username : "MysticAF", password : "newTest123", name : "Elton"};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400);

		const res = await api.get("/api/users");

		expect(res.body.length).toBe(initialUsers.length);

	}, timeoutTime);

	test("when every input constraint is satisfied, the user is added to the database", async () => {
		const newUser = {username : "MysticAF 2", password : "newTest123", name : "Elton Lobo"};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(200);

		const res = await api.get("/api/users");

		expect(res.body.length).toBe(initialUsers.length + 1);

	}, timeoutTime);	
});

beforeEach(async () => {
	await User.deleteMany({});
	await User.insertMany(initialUsers);
}, timeoutTime);