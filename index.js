const express = require('express');

const server = express();

server.use(express.json());

//const projects = [];

const projects = [
  { id: "1", title: 'Novo projeto', tasks: [] },
  { id: "2", title: 'Novo projeto2', tasks: [] },
  { id: "3", title: 'Novo projeto3', tasks: [] }
]

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(e => {
    if(e.id == id){
      e.title = title;
    }
  });
    
  return res.json(projects);
});


server.listen(3334);
