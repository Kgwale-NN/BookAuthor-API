import express , {Express} from 'express';
import { loggerMiddleware } from './middleware/logger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import authorRouter from './routes/author';
import bookRouter from './routes/book';

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(loggerMiddleware)

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});