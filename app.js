import createError from 'http-errors'
import __dirname from './utils.js'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import indexRouter from './routes/index.js'
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import categoriesRouter from "./routes/categories.js";
import cartRoutes from "./routes/cart.js";
import userRoutes from "./routes/users.js";

dotenv.config()
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoriesRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend e-commerce funcionando");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app
