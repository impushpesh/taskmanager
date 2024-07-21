const express= require('express')
const app= express();
const path= require('path');
const mongoose=require('mongoose');
const Task = require('./models/Tasks');
mongoose.connect('mongodb://localhost:27017/taskmanager');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.render('index', { tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/create', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = new Task({ title, description });
        await newTask.save();
        res.redirect('/');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/delete/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.render('edit', { task });
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/update/:id', async (req, res) => {
    const { title, description } = req.body;
    try {
        await Task.findByIdAndUpdate(req.params.id, { title, description });
        res.redirect('/');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000)