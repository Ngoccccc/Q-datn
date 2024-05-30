const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    name: String,
});

const commentSchema = new mongoose.Schema({
    text: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);

app.get('/api/comments', async (req, res) => {
    try {
        const comments = await Comment.find().populate('tags', 'name');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/friends', async (req, res) => {
    try {
        const friends = await User.find();
        res.json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/comments', async (req, res) => {
    const { text, taggedUserIds } = req.body;

    const newComment = new Comment({
        text,
        tags: taggedUserIds,
    });

    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
