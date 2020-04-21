// задание 3

class Hamburger {
    constructor (size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
        this.price = null;
        this.calorific = null;
    }

    addTopping(topping) {
        this.topping.push(topping);
        if (topping == 'seasoning') {
            this.price += 15;
        } else if (topping == 'mayonnaise') {
            this.price += 20;
            this.calorific += 5;
        }
    }

    removeTopping(topping) {
        this.topping.splice(this.topping.indexOf(topping), 1);
        if (topping == 'seasoning') {
            this.price -= 15;
        } else if (topping == 'mayonnaise') {
            this.price -= 20;
            this.calorific -= 5;
        }
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
        if (this.stuffing == 'cheese') {
            this.price += 10;
        } else if (this.stuffing == 'salad') {
            this.price += 20;
        } else if (this.stuffing == 'potatoes') {
            this.price += 15;
        }

        if (this.size == 'big') {
            this.price += 100;
        } else {
            this.price += 50;
        }
        return this.price;
    }
    
    calculateCalories() {
        if (this.stuffing == 'cheese') {
            this.calorific += 20;
        } else if (this.stuffing == 'salad') {
            this.calorific += 5;
        } else if (this.stuffing == 'potatoes') {
            this.calorific += 10;
        }

        if (this.size == 'big') {
            this.calorific += 40;
        } else {
            this.calorific += 30;
        }
        return this.calorific;
    }
}

let hamburger1 = new Hamburger('big', 'salad');

hamburger1.addTopping('mayonnaise');             // добавляем добавку
hamburger1.addTopping('seasoning');   

console.log(hamburger1.getToppings());           // список добавок

console.log(hamburger1.getSize());               // размер бургера

console.log(hamburger1.getStuffing());           // начинка

hamburger1.calculatePrice();                     // расчет цены

hamburger1.calculateCalories();                  // расчет калорий

console.log(hamburger1);

hamburger1.removeTopping('mayonnaise');          //удаляем добавку

console.log(hamburger1);
