//   задание 1 и 3

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        var xhr;
  
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
  
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
  
        xhr.open('GET', url, true);
        xhr.send();
    });
}

class GoodsItem {
    constructor(title, price) {
        this.product_name = title;
        this.price = price;
    }

    render() {
       return `<div class="goods-item"><div class = "good__image"></div>
       <h3>${this.product_name}</h3><p>${this.price}</p><button class="add__good" type="button">Добавить</button></div>`;
    }
}


const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
    constructor() {
        this.goods = [];
    }   

    fetchGoods() {
        new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`)
                .then((goods) => {
                    this.goods = JSON.parse(goods);
                    resolve();
                });                 
             }) 
            
            .then(() => {
                let listHtml = '';
                this.goods.forEach(good => {
                    const goodItem = new GoodsItem(good.product_name, good.price);
                    listHtml += goodItem.render();
                });
                document.querySelector('.goods-list').innerHTML = listHtml;  
            })
    }

    
    sumGoods() {        
            const summaOfGoods = this.goods.reduce((accumulator, good) => {
                return accumulator + good.price;
            }, 0);
            return summaOfGoods;      
    }
}


const list = new GoodsList();
list.fetchGoods();

















