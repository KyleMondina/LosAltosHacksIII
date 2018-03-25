const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req,res) => res.sendFile(path.join(__dirname, '/Public/index.html')));
router.get('/Public/student', (req,res) => res.sendFile(path.join(__dirname, '/Public/student.html')));
router.get('/Public/teacher', (req,res) => res.sendFile(path.join(__dirname, '/Public/teacher.html')));
router.get('/Public/leaderBoard', (req,res) => res.sendFile(path.join(__dirname, '/Public/leaderBoard.html')));

module.exports = router;
