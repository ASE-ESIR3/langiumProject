import express from 'express';
import nocache from 'nocache';

const app = express();
const port = 3000;
app.use(express.static('./public'));
app.use(nocache());
app.listen(port, () => { console.log(`Server for MyDsl assets listening on http://localhost:${port}`)});
