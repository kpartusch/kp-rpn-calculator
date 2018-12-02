import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = express.Router();
router.route('/').get((req, res) => res.status(200).json({ 'data': { 'result': 'Hello World' }}));
app.use('/api', router);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (!module.parent) {
  app.listen(app.get('port'), () => console.log(`Calculator listening on port ${app.get('port')}`));
}

export { app };
