require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const eventRoutes = require('./routes/events');


const app = express();

app.use(cors());
app.use(express.json());


const helmet = require('helmet');
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    styleSrc: ["'self'", "https://fonts.googleapis.com"],
    scriptSrc: ["'self'"]
  }
}));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com;");
  next();
});


// API
app.use('/api/events', eventRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado!");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
      console.log(`Acesse os eventos em: http://localhost:${process.env.PORT}/api/events`);
    });
  })
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));



 