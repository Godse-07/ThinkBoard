require('dotenv').config();
const express = require('express');
const router = require('./routes/notesRoutes');
const connectDb = require('./config/db');
const app = express();
const rateLimitMiddleware = require("./middlewares/rateLimitCheker");
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // Allow all origins, you can specify specific origins if needed
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}))
app.use(rateLimitMiddleware)
// endpoints 
app.use("/api/notes", router)

// connectDb
connectDb().then(()=>{
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
})

