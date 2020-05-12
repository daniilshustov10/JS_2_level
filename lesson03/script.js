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
    constructor(id, title, price) {
        this.id_product = id;
        this.product_name = title;
        this.price = price;
    }

    render() {
       return `<div class="goods-item"><div class = "good__image"></div>
       <h3>${this.product_name}</h3><p>${this.price}</p><button class="add__good" id = ${this.id_product} type="button">Добавить</button></div>`;

    }

    addToBasket() {
        const basketItem = new BasketItem(this.id_product, this.product_name, this.price);
        basketList.basket.push(basketItem);
    }
}


const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }   

    fetchGoods() {
        new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`)
                .then((goods) => {
                    JSON.parse(goods).forEach((good) => {
                        this.goods.push(new GoodsItem(good.id_product, good.product_name, good.price));
                        this.filteredGoods.push(new GoodsItem(good.id_product, good.product_name, good.price));
                    })
                    resolve();
                })
                .then(() => {
                    console.log(this.sumGoods());
                })                
             }) 
            
            .then(() => {
                this.render();
            })
            .then(() => {
                addToBasket();
            })
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
        addToBasket();
    }
    

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {                    
            listHtml += good.render();                  
        });                
        document.querySelector('.goods-list').innerHTML = listHtml;  
    }


    
    sumGoods() {
            const summaOfGoods = this.goods.reduce((accumulator, good) => {
            return accumulator + good.price;
            }, 0);

            return summaOfGoods;     
    }
}


class BasketItem extends GoodsItem {
    constructor(id, title, price) {
        super(id, title, price);
    }

    render() {
        return `<div class="goods-item"><div class = "good__image"></div>
        <h3>${this.product_name}</h3><p>${this.price}</p><button class="remove__good" id = ${this.id_product} type="button">Удалить</button></div>`;
    }
    
    removeFromBasket() {
        basketList.basket.splice(basketList.basket.indexOf(this),1);
    }
}

class BasketList {
    constructor() {
        this.basket = [];
    }  

    render() {
        return new Promise((resolve, reject) => {
            let listHtml = '';
            this.basket.forEach(good => {
                const basketItem = new BasketItem(good.id_product, good.product_name, good.price);
                listHtml += basketItem.render();
            });

            const heading = `<h3>Товары, добавленные в корзину:</h3>`;
            document.querySelector('.head').innerHTML = heading;  
            document.querySelector('.basket-list').innerHTML = listHtml;

            if (this.basket.length == 0) { 
                document.querySelector('.head').innerHTML = '';
            }       
           
            resolve();
        });       
    } 

    getBasketList() {
        return this.basket;
    }
}

const list = new GoodsList();
list.fetchGoods();

const basketList = new BasketList();

function addToBasket() {
    document.querySelectorAll('.add__good').forEach((item) => {
        item.addEventListener('click', (event) => {
            list.goods.forEach((good) => {
                if (good.id_product == event.target.getAttribute("id")) {
                    good.addToBasket();
                }
            })
        });
    })
}

function removeFromBasket() {
    document.querySelectorAll('.remove__good').forEach((item) => {
        item.addEventListener('click', (event) => {
            basketList.basket.forEach((good) => {
                if (good.id_product == event.target.getAttribute("id")) {
                    good.removeFromBasket();
                    
                    basketList.render().then(() => {
                        removeFromBasket();
                    });                  
                }
            })
        });
    })
}

document.querySelector('.cart-button').addEventListener('click', () => basketList.render().then(() => {removeFromBasket()}));

document.querySelector('.search-button').addEventListener('click', (e) => {
    let value = document.querySelector('.goods-search').value;
    list.filterGoods(value);
  });


























