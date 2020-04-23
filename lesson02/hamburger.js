// задание 3

class Hamburger {
    
    static size = [
        {size: 'big', price: 100, calorific: 40},
        {size: 'small', price: 50, calorific: 20}
    ];

    static stuffing = [
        {title: 'cheese', price: 10, calorific: 20},
        {title: 'salad', price: 20, calorific: 5},
        {title: 'potatoes', price: 15, calorific: 10}
    ];

    static topping = [
        {title: 'seasoning', price: 15, calorific: 0},
        {title: 'mayonnaise', price: 20, calorific: 5}
    ];

    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
    }

    addTopping(topping) {
        this.topping.push(topping);
    }

    removeTopping(topping) {
        this.topping.splice(this.topping.indexOf(topping), 1);
    }

    getToppings() {
        return this.topping.toString();
    }

    getSize() {
        return this.size;
    }

    getStuffing() {
        return this.stuffing;
    }

    calculatePrice() {
        this.price = null;

        Hamburger.size.forEach((item) => {
            if (item.size == this.size) {
                this.price += item.price;
            }
        });

        Hamburger.stuffing.forEach((stuffing) => {
            if (stuffing.title == this.stuffing) {
                this.price += stuffing.price;
            }
        });

        Hamburger.topping.forEach((topping) => {
            if (this.topping.includes(topping.title)) {
                this.price += topping.price;
            }
        });

        return this.price;
    }

    calculateCalorific() {
        this.calorific = null;

        Hamburger.size.forEach((item) => {
            if (item.size == this.size) {
                this.calorific += item.calorific;
            }
        });

        Hamburger.stuffing.forEach((stuffing) => {
            if (stuffing.title == this.stuffing) {
                this.calorific += stuffing.calorific;
            }
        });

        Hamburger.topping.forEach((topping) => {
            if (this.topping.includes(topping.title)) {
                this.calorific += topping.calorific;
            }
        });

        return this.calorific;
    }
}

let hamburger1 = new Hamburger('big','cheese');

hamburger1.addTopping('seasoning');      //добавляем добавку
hamburger1.addTopping('mayonnaise');

hamburger1.removeTopping('seasoning');    //удаляем добавку

console.log(hamburger1.getToppings());       //список добавок

console.log(hamburger1.getSize());          // размер гамбургера

console.log(hamburger1.getStuffing());      // начинка гамбургера

hamburger1.calculatePrice();               // расчет цены
hamburger1.calculateCalorific();           // расчет калорийности

console.log(hamburger1);

