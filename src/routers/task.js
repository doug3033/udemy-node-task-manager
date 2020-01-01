const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ... req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})


router.get('/tasks', auth, async (req, res) => {
    try {
        const task = await Task.findOne({owner: req.user._id})
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed' ]
    const isValidOperations = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperations) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        
        task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router
