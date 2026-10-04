const productInfoToggle = document.querySelector('.productInfoToggle');
const productInfoContent = document.querySelector('.productInfoContent');
const productInfoToggleIcon = productInfoToggle.querySelector('.toggleIcon');

const productReturnToggle = document.querySelector('.productReturnToggle');
const productReturnContent = document.querySelector('.productReturnContent');
const productReturnToggleIcon = productReturnToggle.querySelector('.toggleIcon');

productInfoToggle.addEventListener('click', (e) => {
    productInfoContent.hidden = !productInfoContent.hidden;
    productInfoToggle.setAttribute('aria-expanded', String(!productInfoContent.hidden));
    productInfoToggleIcon.textContent = productInfoContent.hidden ? '+' : '-';
});

productReturnToggle.addEventListener('click', (e) => {
    productReturnContent.hidden = !productReturnContent.hidden;
    productReturnToggle.setAttribute('aria-expanded', String(!productReturnToggle.hidden));
    productReturnToggleIcon.textContent = productReturnToggle.hidden ? '+' : '-';
});