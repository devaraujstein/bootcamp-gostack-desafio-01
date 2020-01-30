const express = require('express');

const server = express();

server.use(express.json());

const projects = [{
  id : "0",
  title : "Desafio 01",
  tasks : [
    "Realizar os Metodos 'POST', 'GET', 'UPDATE', 'DELETE', 'CREATE'",
    "Criar middlewares"
  ]
}];

server.use((req,res,next) =>{
  console.count('Number Request : ')
  
  next();

})

function checkProjectsExists(req, res, next){
  const {id} = req.params

  const projectExists = projects.find(element => element.id == id)
  
  if(!projectExists){
    return res.status(400).json({error : "Project not Exists"});
  }
  
  return next();
}

server.get('/projects', (req,res) => {
  return res.status(200).json(projects);
})

server.get('/projects/:id', checkProjectsExists, (req,res) => {
  const { id } = req.params;

  const project = projects.find(element => element.id == id);
  
  return res.status(200).json(project);
})

server.post('/projects', (req,res) => {
  const { id,title,tasks } = req.body;

  const project = {
    id,
    title,
    tasks : []
  };

  projects.push(project);
  
  return res.status(201).json(projects)

})

server.put('/projects/:id', checkProjectsExists, (req,res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(element => element.id == id);

  project.title = title;
  
  return res.status(200).json(projects);
  
})

server.delete('/projects/:id', checkProjectsExists, (req,res) => {
  const {id} = req.params;

  const index = projects.findIndex(element => element == id);

  projects.splice(index, 1);

  return res.status(200).json(projects);
})

server.post('/projects/:id/tasks', checkProjectsExists, (req,res) => {
  const {id} = req.params;
  const {tasks} = req.body;

  const project = projects.find(element => (element.id == id));

  project.tasks.push(tasks);

  return res.status(200).json(projects);

})

server.listen('3000');