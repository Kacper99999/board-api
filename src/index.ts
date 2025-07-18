import express from 'express'

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Backend działa')
})

app.listen(PORT,() => {
    console.log((`Backend działa na porcie ${PORT}`))
})