const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { signup, login } = require('../../controllers/userControllers.js');
const User = require('../../schema/userSchema.js');

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth Controller', () => {
    let req, res, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { body: {} };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('signup', () => {
        it('should sign up a user and return a token', async () => {
            const user = { _id: 'user_id', email: 'test@example.com' };
            const token = 'jwt_token';

            sandbox.stub(User, 'signup').resolves(user);
            sandbox.stub(jwt, 'sign').returns(token);

            req.body = { name: 'Test User', email: 'test@example.com', password: 'password', role: 'user' };

            await signup(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({ email: user.email, token });
        });

        it('should return 400 if signup fails', async () => {
            const error = new Error('Signup error');

            sandbox.stub(User, 'signup').throws(error);

            req.body = { name: 'Test User', email: 'test@example.com', password: 'password', role: 'user' };

            await signup(req, res);

            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({ error: error.message });
        });
    });

    describe('login', () => {
        it('should log in a user and return a token', async () => {
            const user = { _id: 'user_id', email: 'test@example.com', role: 'user', name: 'Test User' };
            const token = 'jwt_token';

            sandbox.stub(User, 'login').resolves(user);
            sandbox.stub(jwt, 'sign').returns(token);

            req.body = { email: 'test@example.com', password: 'password' };

            await login(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({ email: user.email, token, name: user.name, role: user.role });
        });

        it('should return 400 if login fails', async () => {
            const error = new Error('Login error');

            sandbox.stub(User, 'login').throws(error);

            req.body = { email: 'test@example.com', password: 'password' };

            await login(req, res);

            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({ error: error.message });
        });
    });
});
