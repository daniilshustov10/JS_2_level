const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue ({
     el: '#app',
     data: {
         goods: [],
         filteredGoods: [],
         searchLine: '',
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

        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },

        addToBasket(event) {
            this.goods.forEach((good) => {
                if(good.id_product == event.target.getAttribute('id')) {
                    this.basket.push(good);
                }
            })  
            document.querySelector('.basket-list').style.display = 'none';          
        },

        renderBasketList() {

            this.isVisibleCart = (this.isVisibleCart == 'none') ? 'grid': 'none';
            document.querySelector('.basket-list').style.display = this.isVisibleCart;
        },

        removeFromBasket() {
            this.basket.forEach((good) => {
                if (good.id_product == event.target.getAttribute('id')) {
                    this.basket.splice(this.basket.indexOf(good), 1);
                }
            })
        }        
    },
    
    computed: {
        summaOfGoods() {
            let result = this.basket.reduce((accumulator, good) => {
                return accumulator + good.price;
            }, 0);
            return result;
        }
    },

    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`)
            .then((goods) => {
                JSON.parse(goods).forEach((good) => {
                    this.goods.push(good);
                    this.filteredGoods.push(good);
                })
            })
        document.querySelector('.basket-list').style.display = 'none';
    } 
});



































