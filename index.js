const express = require('express');

const server = express();

server.use(express.json());

//const projects = [];
var request_count = 0;

const projects = [
  { id: "1", title: 'Novo projeto', tasks: [] },
  { id: "2", title: 'Novo projeto2', tasks: [] },
  { id: "3", title: 'Novo projeto3', tasks: [] }
]

// Middlewares 
function requestCounter(req, res, next){
  request_count = request_count + 1;
  console.log(request_count);
  return next();
}

function checkProjectExists( req, res, next) {
  const { id } = req.params;
  
  if(!projects.find(e => {    
    return e.id == id
  })){
    return res.status(400).json({ error: 'The project ID does not exists!'});
  };

  return next();
}

server.use(requestCounter);

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  
  projects.forEach(e => {
    if(e.id == id){
      e.title = title;      
      return res.status(400).json({ error: 'The project ID already exists!'});
    }
  });
  
  projects.push({
    id,
    title,
    tasks: []
  });  

  return res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(e => {
    if(e.id == id){
      e.title = title;      
    }
  });
    
  return res.json(projects);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  projects.forEach((e, i )=> {
    
    if(e.id == id){
      projects.splice(i,1);
    }
  });
    
  return res.json(projects);
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(e => {
    if(e.id == id){
      e.tasks.push(title);  
    }
  });
    
  return res.json(projects);
});


server.listen(3334);
