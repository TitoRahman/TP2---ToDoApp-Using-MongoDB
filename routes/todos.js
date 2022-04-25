const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Middleware
async function getTodo(req, res, next){
    let todo
    try {
        todo = await Todo.findById(req.params.id)
        if (todo == null) {
            return res.status(404).json({error : `no user with ${req.params.id} was found`})
        }

    } catch (error) {
        return res.status(500).json({error : `${error}`})
    }
    res.todo = todo
    next()
}

// Show Available Routes
router.get('/',  (req, res) => {
    res.send(
        '<b>Todos API by Tito Ardimam Rahman (191110945)</b><br>' +
        'Rute yang ada :<br>' +
        '\u2714\uFE0F GET /todos \u27A1\uFE0F Tampilkan semua todos <br>' +
        '\u{1F50E} GET /todos/:id \u27A1\uFE0F Tampilkan semua todos sesuai "ID"<br>' +
        '\u2795 POST /todos/add \u27A1\uFE0F Buat todos baru<br>' +
        '\u270F\uFE0F PUT /todos/:id \u27A1\uFE0F Update todos sesuai "ID"<br>' +
        '\u274C DELETE /todos/:id \u27A1\uFE0F Hapus todos sesuai "ID"<br>' +
        '\u{1FA79} PATCH /todo/:id \u27A1\uFE0F Update todos sesuai "ID"<br>'
        )
})

// Show All Todos with GET
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (error) {
        res.status(500).json({error : error})
    }
})

// Show Todo by ID with GET
router.get('/todo/:id',getTodo, (req, res) => {
    res.json(res.todo);
})

// Create Todo with POST
router.post('/todo/add', async (req, res) =>{
    const todo = new Todo({
        _id : req.body.id,
        title : req.body.title,
        text : req.body.text,
        date : req.body.date
    })
    try {
        const saveTodo = await todo.save()
        res.status(201).json(saveTodo)
    } catch (error) {
        res.status(500).json({error : error})
    }
})

// Update Todo with PUT
router.put('/todo/:id', getTodo, async (req, res) =>{
    if (req.body.title != null){
        res.todo.title = req.body.title
    }
    if (req.body.text != null){
        res.todo.text = req.body.text
    }
    if (req.body.date != null){
        res.todo.date = req.body.date
    }
    try {
        const newTodo = await res.todo.save()
        res.json(newTodo)
    } catch (error) {
        res.status(500).json({error : error})
    }
})

// Update Todo with PATCH
router.patch('/todo/:id', async (req, res) =>{
    if (req.body.title != null){
        res.todo.title = req.body.title
    }
    if (req.body.text != null){
        res.todo.text = req.body.text
    }
    if (req.body.date != null){
        res.todo.date = req.body.date
    }
    try {
        const newTodo = await res.todo.save()
        res.json(newTodo)
    } catch (error) {
        res.status(500).json({error : error})
    }
})

// Delete Todo with DELETE
router.delete('/todo/:id', getTodo, async (req, res) =>{
    try {
        await res.todo.remove()
        res.todo = await Todo.find()
        res.status(201).json(res.todo)
    } catch (error) {
        res.status(500).json({error : error})
    }
})

module.exports = router;