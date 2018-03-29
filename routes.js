const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req,res) => res.sendFile(path.join(__dirname, '/Public/index.html')));
router.get('/Public/student/student.html', (req,res) => res.sendFile(path.join(__dirname, '/Public/student/student.html')));
router.get('/Public/teacher/teacher.html', (req,res) => res.sendFile(path.join(__dirname, '/Public/teacher/teacher.html')));
router.get('/Public/leaderBoard/leaderBoard.html', (req,res) => res.sendFile(path.join(__dirname, '/Public/leaderBoard/leaderBoard.html')));

module.exports = router;
