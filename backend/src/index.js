/**
 * Tipos de parametros:
 * 
 * Query parems: Filtros e paginação
 * Route parems: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo na hora de criar ou editar um recurso
 */

 /**
  * Middleware:
  * 
  * Interseptador de requisições que interrmpe totalmente a requisição ou altera dados da requisição
  * 
  */

const { request, response } = require("express");
const express = require("express");
const {uuid} = require('uuidv4');
const app = express();

app.use(express.json());


const projects = [];

function logRequest(request, response, next){

}

app.get('/projects', (request, response) => {
    const {title} = request.query;

    const results = title ? projects.filter(project => project.title.includes(title)) : projects;

    return response.json(results);
});

app.post('/projects', (request,response) =>{
    const {title, owner} = request.body;

    const project = { id: uuid(), title, owner};

    projects.push(project);

    return response.status(201).json(project);
})

app.put('/projects/:id', (request,response) =>{
    const { id } = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id == id); 

    if (projectIndex < 0) {
        return response.status(400).json( {erro: 'Project not found.'});
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project)
})

app.delete('/projects/:id', (request,response) =>{
    const { id } = request.params;
 
    const projectIndex = projects.findIndex(project => project.id == id); 

    if (projectIndex < 0) {
        return response.status(400).json( {erro: 'Project not found.'});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
})


app.listen(3333, () =>{
    console.log('Back-end started');
});

