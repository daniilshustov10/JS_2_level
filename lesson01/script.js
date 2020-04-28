const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
  
const renderGoodsItem = (title = 'название товара', price = 0) => {
    return `<div class="goods-item"><div class = "good__image"></div><h3>${title}</h3><p>${price}</p><button class="add__good" type="button">Добавить</button></div>`;
};
  
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);


