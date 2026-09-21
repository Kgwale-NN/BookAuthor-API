import express , {Express} from 'express';
import { loggerMiddleware } from './middleware/logger';
import authorRouter from './routes/author';
const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(loggerMiddleware)

app.use("/authors", authorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});