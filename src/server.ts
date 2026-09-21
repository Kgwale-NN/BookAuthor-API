import express , {Express} from 'express';
import { loggerMiddleware } from './middleware/logger';
import authorRouter from './routes/author';
import bookRouter from './routes/book';

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(loggerMiddleware)

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});