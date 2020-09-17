const express = require('express');

/* Instantiate the Express app */
const app = express();

/* Set the view engine to pug */
app.set('view engine', 'pug');

/* Static middleware for serving static files */
app.use('/static', express.static('public'));

/* Import route definitions - exported from index.js*/
const mainRoutes = require('./routes');

/* Use route definitions */
app.use(mainRoutes);

/* 404 handler for undefined or non-existent route requests */
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'Oh no! Page not found.';
    res.render('page-not-found', {err});
});

/* Global error handler */
app.use((err, req, res, next) => {
    if (err.status === 404) {
        err.message = 'Oh no! Page not found.';
        res.render('page-not-found', {err});
    } else {
        err.message = err.message || 'It looks like something went wrong on the server.'
        err.status = err.status || 500;
        res.render('error', {err});
    }
});

/* Listen on port 3000, and log a string to the console to idnicate on which port the app is listening to. */
app.listen(3000, ()=> {
    console.log('The application is running on localhost: 3000');
});