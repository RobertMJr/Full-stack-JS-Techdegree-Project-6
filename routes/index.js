const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

/** GET root route - render the index template and pass it the projects object */
router.get('/', (req, res)=> {
    res.render('index', { projects });
});

/* GET about route - render the about template */
router.get('/about', (req, res) => {
    res.render('about');
});

/* GET project route based on id */
router.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId);
    /** If the project can be found - render the project template and pass it the project object 
        Else return next which will trigger the 404 error handler
    */
    if (project) {
        res.render('project', { project }); 
    } else {
        return next();
    } 
});


module.exports = router;