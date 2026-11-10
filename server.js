const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let idCounter = 1;

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] - Method: ${req.method} - URL: ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Taskflow API Çalışıyor!');
});
app.post('/tasks', (req, res) => {
    const { title, description, priority, assignee } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Görev başlığı (title) zorunludur!' });
    }

    const newTask = {
        id: idCounter++,
        title,
        description: description || '',
        priority: priority || 'normal',
        assignee: assignee || 'Atanmadı',
        status: 'pending',
    };

    tasks.push(newTask);
    res.status(201).json({
        message: 'Görev başarıyla oluşturuldu.',
        task: newTask
    });
});

app.get('/tasks', (req, res) => {
    res.json({
        totalTasks: tasks.length,
        tasks
    });
});

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Aradığınız ID ile eşleşen görev bulunamadı.' });
    }

    res.json(task);
});

app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: "Aradığınız ID ile eşleşen görev bulunamadı." });
    }
    if (req.body.status !== undefined) {
        task.status = req.body.status;
    }
    if (req.body.title !== undefined) {
        task.title = req.body.title;
    }
    if (req.body.description !== undefined) {
        task.description = req.body.description;
    }
    if (req.body.priority !== undefined) {
        task.priority = req.body.priority;
    }
    if (req.body.assignee !== undefined) {
        task.assignee = req.body.assignee;
    }

    res.json({
        message: "Görev başarıyla kısmen güncellendi (PATCH).",
        task
    });
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Güncellenecek görev bulunamadı.' });
    }

    const { title, description, priority, assignee, status } = req.body;

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description: description !== undefined ? description : tasks[taskIndex].description,
        priority: priority || tasks[taskIndex].priority,
        assignee: assignee || tasks[taskIndex].assignee,
        status: status || tasks[taskIndex].status
    };

    res.json({
        message: 'Görev başarıyla güncellendi.',
        task: tasks[taskIndex]
    });
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Silinecek görev bulunamadı.' });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({
        message: 'Görev sistemden kaldırıldı.',
        task: deletedTask[0]
    });
});
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} adresinde çalışıyor...`);
});