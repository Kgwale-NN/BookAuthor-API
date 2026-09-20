import bodyParser from 'body-parser';
import express , {Express} from 'express';
import { loggerMiddleware } from './middleware/logger';

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use(loggerMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});