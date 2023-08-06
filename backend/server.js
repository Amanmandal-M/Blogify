const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Config Location
const { SeqConnection } = require('./configs/db');


// Routes Location
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const errorRouter = require('./routes/errorRoutes');
const blogRouter = require('./routes/blogPostRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const commentRouter = require('./routes/commentRoutes');
const followRouter = require('./routes/followRoutes');
const likeRouter = require('./routes/likeRoutes');
const tagRouter = require('./routes/tagRoutes');
const userDashboardRouter = require('./routes/userDashboardRoutes');


// Middleware Location
const { authenticateUser } = require('./middlewares/authMiddleware');
const { adminKeyAuthenticator } = require('./middlewares/adminAuthMiddleware');


app.use(express.json());

// Set the view engine to EJS
app.set('view engine', 'ejs'); // This line is crucial

// Configure static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.render('home/home');
});

// Error route
app.use(errorRouter);

app.use('/user', userRouter);

// Authentication for user 
app.use(authenticateUser);

// Private routes
app.use('/blogposts', blogRouter);
app.use('/category', categoryRouter);
app.use('/comments', commentRouter);
app.use('/follows', followRouter);
app.use('/likes', likeRouter);
app.use('/tags', tagRouter);
app.use('/users/dashboard', userDashboardRouter);
 
// Authentication for user 
app.use(adminKeyAuthenticator)
app.use('/admin', adminRouter);



app.listen(PORT, async () => {
  try {
    await SeqConnection.authenticate();
    console.log(`Server is listening on PORT: ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
});
