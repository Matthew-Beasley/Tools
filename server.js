const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express(), DIST_DIR = __dirname, HTML_FILE = path.join(DIST_DIR, 'index.html')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    }  else {
      next();
    }
  });
}

const csrfProtection = csurf({
  cookie: true
});

app.use(express.static(DIST_DIR))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
console.log(path.join(__dirname, 'dist/index.html'))

app.get('/', csrfProtection, (req, res, next) => {
  try {
    res.cookie('CSRF_token', req.csrfToken()).sendFile(HTML_FILE)
  } catch (error) {
    next(error);
  }
});

app.get('/logo', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '/assets/images/logo.png'));
  } catch (error) {
    next(error)
  }
});

//maybe rethink this error handling
app.use((req, res, next) => {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`,
  });
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err),
  });
});

app.listen(process.env.PORT, () => console.log('Listening on PORT ', process.env.PORT));