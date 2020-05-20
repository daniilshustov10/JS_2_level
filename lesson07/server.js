const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static('.'));

app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {

    fs.readFile('cart.json', 'utf-8', (err, data) => {

      if (err) {
        res.send('{"result": 0}');
      } else {
        const cart = JSON.parse(data);
        const item = req.body;
        
        cart.push(item);
  
        fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
          if (err) {
            res.send('{"result": 0}');
          } else {
            res.send('{"result": 1}');
          }
        });
      }
    });
});

app.post('/removeFromCart', (req, res) => {

    fs.readFile('cart.json', 'utf-8', (err, data) => {

      if (err) {
        res.send('{"result": 0}');
      } else {
        const cart = JSON.parse(data);
        const item = req.body;
        
        cart.splice(cart.indexOf(item), 1);
  
        fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
          if (err) {
            res.send('{"result": 0}');
          } else {
            res.send('{"result": 1}');
          }
        });
      }
    });
});


app.listen(3000, () => {
    console.log('server is running on port 3000!');
});





