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

app.post('/IncreaseQuantity', (req, res) => {

  fs.readFile('cart.json', 'utf-8', (err, data) => {

    if (err) {
      res.send('{"result": 0}');
    } else {
      let cart = JSON.parse(data);
      const item = req.body;
      
      cart.forEach((good) => {
        if (good.id_product == item.id_product) {
          good.quantity++;
        }
      });     

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

app.post('/DecreaseQuantity', (req, res) => {

  fs.readFile('cart.json', 'utf-8', (err, data) => {

    if (err) {
      res.send('{"result": 0}');
    } else {
      let cart = JSON.parse(data);
      const item = req.body;
      
      cart.forEach((good) => {
        if (good.id_product == item.id_product) {
          good.quantity--;
          if (good.quantity < 0) {
            good.quantity = 0;
          }
        }
      });     

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

app.post('/addToStats', (req, res) => {

    fs.readFile('stats.json', 'utf-8', (err, data) => {

      if (err) {
        res.send('{"result": 0}');
      } else {
        const stats = JSON.parse(data);
        const item = req.body;
        
        stats.push(item);
  
        fs.writeFile('stats.json', JSON.stringify(stats), (err) => {
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
        let cart = JSON.parse(data);
        const item = req.body;
        
        cart = cart.filter((good) => good.id_product != item.id_product);
  
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





