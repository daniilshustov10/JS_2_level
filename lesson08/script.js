Vue.component('header-menu', {
    data() {
        return {
            menuItems: ['Главная', 'Каталог', 'Контакты'],
        }
    },
    template: `
                <div class="menu">
                    <ul>
                        <menu-item v-for = "item in menuItems" :key="item" :item = "item"></menu-item>
                    </ul>
                </div>
    `
});

Vue.component('menu-item', {
    props: ['item'],
    template: '<li><a href="">{{ item }}</a></li>'
});

Vue.component('search', {
    data() {
        return {
            searchLine: '',
        }
    },
    template: ` <div class = "search">
                    <input type="text" class="goods-search" v-model="searchLine" />
                    <button class="search-button" type = "button" @click = "filterGoods">Искать</button>
                </div>
    `,
    methods: {
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.$root.filteredGoods = this.$root.goods.filter(good => regexp.test(good.product_name));
        }
    }
});


Vue.component('goods-list', {
    props: ['goods'],
    template: `
                <div class="goods-list">
                    <goods-item 
                        v-for = "product in goods" 
                        :product="product"
                        v-bind:key="product.id_product">
                        </goods-item>
                </div>           
    `,
})

Vue.component('goods-item', {   
    props: ['product'],
    template: `
                <div class="goods-item">
                    <div class = "good__image"></div>   
                    <h3> {{ product.product_name }} </h3>
                    <p> {{ product.price }} </p>
                    <button class="add__good" v-bind:id = "product.id_product" type="button" @click = "addToBasket">Добавить</button>
                </div> 
                `,
    methods: {
        addToBasket(event) {
            let data = {};
            let stats = { 
                action: 'add',
                time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            };
            this.$root.goods.forEach((good) => {
                if(good.id_product == event.target.getAttribute('id')) {
                    data['id_product'] = good.id_product;
                    data['product_name'] = good.product_name;
                    data['price'] = good.price;
                    data['quantity'] = 1;
                    stats['product_name'] = good.product_name;
                }
            });
            this.$root.makePOSTRequest('/addToCart', JSON.stringify(data));
            this.$root.makePOSTRequest('/addToStats', JSON.stringify(stats));  
            document.querySelector('.basket-list').style.display = 'none';          
        }
    }        
});


Vue.component('basket-list', {
    props: ['goods'],
    template: `
            <div class="basket-list">

                <div v-if = "goods.length == 0">
                    <h2>Нет товаров в корзине</h2>
                </div> 

                <div class="head" v-if="goods.length != 0">
                    <h2>Сумма товаров в корзине: {{ summaOfGoods }} </h2>
                </div>
  
                <basket-item 
                            v-for= "good in goods" 
                            :good="good"
                            v-bind:key="good.id_product">
                </basket-item>
            </div>   
    `,
    computed: {
        summaOfGoods() {           
            let result = this.$root.basket.reduce((accumulator, good) => {
                return accumulator + good.price*good.quantity;
            }, 0);
            return result;           
        }
    },
})

Vue.component('basket-item', {
    props: ['good'],
    template: `
        <div class="goods-item">
            <div class = "good__image"></div>   
            <h3> {{ good.product_name }} </h3>
            <p> {{ good.price }} </p>
            <div class = "countGoods">
                <button @click = "increaseCount">+</button>
                <input type = "text"  v-model = "good.quantity">
                <button @click = "decreaseCount">-</button>
            </div>
            <button class="remove__good" v-bind:id = "good.id_product"  type="button" @click = "removeFromBasket">Удалить</button>
        </div> 
    `,
    methods: {
        removeFromBasket(event) {
            let data = {};
            let stats = { 
                action: 'remove',
                time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            };
            this.$root.basket.forEach((good) => {
                if(good.id_product == event.target.getAttribute('id')) {
                    data['id_product'] = good.id_product;
                    data['product_name'] = good.product_name;
                    data['price'] = good.price;
                    data['quantity'] = good.quantity;
                    stats['product_name'] = good.product_name;
                }
                
            });
            this.$root.makePOSTRequest('/addToStats', JSON.stringify(stats));
            this.$root.makePOSTRequest('/removeFromCart', JSON.stringify(data))
             .then(() => {
                 this.$root.basket.splice(0, this.$root.basket.length);
                 this.$root.makeGETRequest('/cartData')
                    .then((goods) => {
                        JSON.parse(goods).forEach((good) => {
                            this.$root.basket.push(good);
                        })
                    })
             })
            
        },

        increaseCount() {
            this.good.quantity++;
            this.$root.makePOSTRequest('/IncreaseQuantity', JSON.stringify(this.good));
        }, 

        decreaseCount() {
            this.good.quantity--;
            if (this.good.quantity < 0) {
                this.good.quantity = 0;
            }
            this.$root.makePOSTRequest('/DecreaseQuantity', JSON.stringify(this.good));
        }
    }  
})


const app = new Vue ({
     el: '#app',
     data: {
         goods: [],
         filteredGoods: [],
         isVisibleCart: 'none',
         basket: [],
    },
    methods: {
        makeGETRequest(url) {
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
            })
        },
        
        makePOSTRequest(url, data) {
            return new Promise((resolve, reject) => {

                let xhr;
        
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
        
                xhr.open('POST', url, true);

                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');        
                xhr.send(data);
            })          
        },                

        renderBasketList() {

            this.basket.splice(0, this.basket.length);

            this.makeGETRequest('/cartData')
            .then((goods) => {
                JSON.parse(goods).forEach((good) => {
                    this.basket.push(good);
                })
            })

            if (document.querySelector('.goods-list').style.display == '') {
                document.querySelector('.goods-list').style.display = 'none';
            } else {
                document.querySelector('.goods-list').style.display = '';
            }

            this.isVisibleCart = (this.isVisibleCart == 'none') ? 'grid': 'none';
            document.querySelector('.basket-list').style.display = this.isVisibleCart;                 
        },                
    },    

    mounted() {
        this.makeGETRequest(`/catalogData`)
            .then((goods) => {
                JSON.parse(goods).forEach((good) => {
                    this.goods.push(good);
                    this.filteredGoods.push(good);
                })
            })
        
        document.querySelector('.basket-list').style.display = 'none';
    } 
});



































