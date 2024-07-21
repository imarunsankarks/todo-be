const mongoose = require('mongoose');

const Schema = mongoose.Schema

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'in progress', 'completed', 'incomplete'],
            default: 'pending'
        },
        recurrence: {
            type: String,
            enum: ['none', 'daily', 'weekly', 'monthly', 'daily none', 'weekly none', 'monthly none'],
            default: 'none'
        },
        deadline: {
            type: Date,
        }
    },
    { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task