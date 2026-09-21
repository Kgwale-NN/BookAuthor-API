import bodyParser from 'body-parser';
import express , {Express} from 'express';
import { loggerMiddleware } from './middleware/logger';
import routor from './routes/author';

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use(loggerMiddleware)

app.use("/v1/author",routor);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});