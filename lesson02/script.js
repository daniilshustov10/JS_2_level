//   задание 1 и 2

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
       return `<div class="goods-item"><div class = "good__image"></div>
       <h3>${this.title}</h3><p>${this.price}</p><button class="add__good" type="button">Добавить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }   

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
          ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price);
          listHtml += goodItem.render();
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

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.sumGoods());












