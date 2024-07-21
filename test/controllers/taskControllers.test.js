const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { server } = require('../../server.js'); // Adjust the path to your Express server
const { getAll, getOne, postTask, deleteTask, updateTask } = require('../../controllers/taskControllers.js'); // Adjust the path to your Task controller
const Task = require('../../schema/taskSchema.js'); // Adjust the path to your Task model

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('sinon-chai'));

describe('Task Controller', () => {
    let req, res, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { user: { _id: 'testUserId' } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getAll', () => {
        it('should return all tasks for a user', async () => {
            const tasks = [{ title: 'Task 1' }, { title: 'Task 2' }];
            sandbox.stub(Task, 'find').returns({ sort: sinon.stub().resolves(tasks) });

            await getAll(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(tasks);
        });

        it('should return 404 if No tasks found', async () => {
            sandbox.stub(Task, 'find').returns({ sort: sinon.stub().resolves([]) });

            await getAll(req, res);

            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message: 'No tasks found' });
        });

        // Additional tests
        it('should handle errors from Task.find', async () => {
            const errorMessage = 'Database error';
            sandbox.stub(Task, 'find').throws(new Error(errorMessage));

            await getAll(req, res);

            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({ message: errorMessage });
        });

        it('should sort tasks by creation date in descending order', async () => {
            const tasks = [
                { title: 'Task 2', createdAt: new Date('2024-01-02') },
                { title: 'Task 1', createdAt: new Date('2024-01-01') }
            ];

            sandbox.stub(Task, 'find').returns({ sort: sinon.stub().resolves(tasks) });

            await getAll(req, res);

            expect(Task.find).to.have.been.calledWith({ user: req.user._id });
            expect(Task.find().sort).to.have.been.calledWith({ createdAt: -1 });
        });

        it('should use the correct user ID when fetching tasks', async () => {
            const userId = 'testUserId';
            req.user._id = userId;

            sandbox.stub(Task, 'find').returns({ sort: sinon.stub().resolves([]) });

            await getAll(req, res);

            expect(Task.find).to.have.been.calledWith({ user: userId });
        });

        it('should return tasks in the expected format', async () => {
            const tasks = [
                { title: 'Task 1', createdAt: new Date(), description: 'Description 1' },
                { title: 'Task 2', createdAt: new Date(), description: 'Description 2' }
            ];

            sandbox.stub(Task, 'find').returns({ sort: sinon.stub().resolves(tasks) });

            await getAll(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(sinon.match.array.deepContaining([
                sinon.match.has('title'),
                sinon.match.has('createdAt'),
                sinon.match.has('description')
            ]));
        });
    });

    describe('getOne', () => {
        it('should return a task by ID if it exists', async () => {
            const task = { title: 'Task 1', _id: 'taskId' };
            sandbox.stub(Task, 'findById').resolves(task);

            req.params = { id: 'taskId' };

            await getOne(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(task);
        });

        it('should return 404 if the task is not found', async () => {
            sandbox.stub(Task, 'findById').resolves(null);

            req.params = { id: 'taskId' };

            await getOne(req, res);

            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message: 'Task not found' });
        });

        it('should handle errors from Task.findById', async () => {
            const errorMessage = 'Database error';
            sandbox.stub(Task, 'findById').throws(new Error(errorMessage));

            req.params = { id: 'taskId' };

            await getOne(req, res);

            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({ message: errorMessage });
        });
    });

    describe('postTask', () => {
        it('should create a new task', async () => {
            const newTask = {
                title: 'New Task',
                description: 'Task description',
                status: 'pending',
                recurrence: 'weekly',
                deadline: new Date()
            };
            const savedTask = { ...newTask, _id: 'newTaskId' };

            // Stub the Task.create method
            sandbox.stub(Task, 'create').resolves(savedTask);

            req.body = newTask;

            await postTask(req, res);

            expect(res.status).to.have.been.calledWith(200); // Check for 201 status code
            expect(res.json).to.have.been.calledWith(savedTask);
        });

        it('should return 500 if there is an error creating a task', async () => {
            const errorMessage = 'Database error';

            // Stub the Task.create method to throw an error
            sandbox.stub(Task, 'create').throws(new Error(errorMessage));

            req.body = {
                title: 'New Task',
                description: 'Task description',
                status: 'pending',
                recurrence: 'weekly',
                deadline: new Date()
            };

            await postTask(req, res);

            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({ error: errorMessage });
        });
    });


    describe('deleteTask', () => {
        it('should delete a task by ID and return a success message', async () => {
            const deletedTask = { title: 'Task to delete', _id: 'taskId' };
            sandbox.stub(Task, 'findByIdAndDelete').resolves(deletedTask);

            req.params = { id: 'taskId' };

            await deleteTask(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({ msg: 'task deleted', task: 'Task to delete' });
        });

        it('should return 404 if the task to delete is not found', async () => {
            sandbox.stub(Task, 'findByIdAndDelete').resolves(null);

            req.params = { id: 'taskId' };

            await deleteTask(req, res);

            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message: 'No tasks found' });
        });

        it('should handle errors from Task.findByIdAndDelete', async () => {
            const errorMessage = 'Database error';
            sandbox.stub(Task, 'findByIdAndDelete').throws(new Error(errorMessage));

            req.params = { id: 'taskId' };

            await deleteTask(req, res);

            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({ message: errorMessage });
        });
    });


    describe('updateTask', () => {
        it('should update a task by ID and return the updated task', async () => {
            const updatedTask = { title: 'Updated Task', _id: 'taskId' };
            sandbox.stub(Task, 'findByIdAndUpdate').resolves(updatedTask);

            req.params = { id: 'taskId' };
            req.body = { title: 'Updated Task' };

            await updateTask(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(updatedTask);
        });

        it('should return 404 if the task to update is not found', async () => {
            sandbox.stub(Task, 'findByIdAndUpdate').resolves(null);

            req.params = { id: 'taskId' };
            req.body = { title: 'Updated Task' };

            await updateTask(req, res);

            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message: 'Task not found' });
        });

        it('should handle errors from Task.findByIdAndUpdate', async () => {
            const errorMessage = 'Database error';
            sandbox.stub(Task, 'findByIdAndUpdate').throws(new Error(errorMessage));

            req.params = { id: 'taskId' };
            req.body = { title: 'Updated Task' };

            await updateTask(req, res);

            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({ message: errorMessage });
        });
    });

});
