import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index'
var cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSucessStatus: 200
}

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/', routes);

const PORT = process.env.PORT || 8585

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})