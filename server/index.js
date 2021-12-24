const path = require('path');
const express = require('express');
const app = express();


app.use('/libs', express.static(path.join(__dirname, 'libs')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/practice', express.static(path.join(__dirname, 'practice')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('app listening at http://localhost:3000')
});
