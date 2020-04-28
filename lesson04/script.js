// задание 1 и 2 

function replaceQuates() {
    const text = document.querySelector('#firstData').value.replace(/\B\'|\'\B/g, '\"');
    document.querySelector('#firstData').value = text;
}

document.querySelector('#changeTextarea').addEventListener('click', () => replaceQuates());

// задание 3 

function validateName() {
    const value = document.querySelector('#name').value;
    if (!/^[а-яА-ЯёЁA-Za-z]+$/.test(value)) {
        document.querySelector('#name').classList.add('redBorder');
        document.querySelector('#name').value = 'Имя содержит только буквы';
    }
}

function validatePhoneNumber() {
    const value = document.querySelector('#phone').value;
    if (!/\+7\(\d{3}\)\d{3}-\d{4}/.test(value)) {
        document.querySelector('#phone').classList.add('redBorder');
        document.querySelector('#phone').value = 'Телефон должен иметь вид +7(000)000-0000';
    }
}

function validateEmail() {
    const value = document.querySelector('#email').value;
    if (!/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/.test(value)) {
        document.querySelector('#email').classList.add('redBorder');
        document.querySelector('#email').value = 'mymail@mail.ru / my.mail@mail.ru / my-mail@mail.ru';
    }
}

document.querySelector('#sendForm').addEventListener('click', () => validateName());
document.querySelector('#sendForm').addEventListener('click', () => validatePhoneNumber());
document.querySelector('#sendForm').addEventListener('click', () => validateEmail());