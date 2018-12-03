import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';

import { getCalculatorResult } from './calculator/calculator.controller';
import { validateGetCalculatorResult } from './calculator/calculator.validation';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = express.Router();
router.route('/calculator').get(validateGetCalculatorResult(), getCalculatorResult);
app.use('/api', router);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (!module.parent) {
  app.listen(app.get('port'), () => console.log(`Calculator listening on port ${app.get('port')}`));
}

export { app };
