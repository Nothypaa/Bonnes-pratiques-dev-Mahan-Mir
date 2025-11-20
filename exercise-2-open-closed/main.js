const amountInput = document.querySelector('#order-amount');
const shippingSelect = document.querySelector('#shipping-type');
const calcButton = document.querySelector('#calc-btn');
const resultEl = document.querySelector('#result');


function formatPrice(value) {
    return value.toFixed(2).replace('.', ',') + ' €';
  }
  
  const shippingStrategies = {
    standard: (orderAmount) => orderAmount >= 50 ? 0 : 4.99,
    express: (orderAmount) => orderAmount >= 100 ? 0 : 9.99,
    pickup: (orderAmount) => orderAmount >= 30 ? 0 : 2.99,
  };
  
  function calculateShippingCost(type, orderAmount) {
    const strategy = shippingStrategies[type];
    return strategy ? strategy(orderAmount) : 0;
  }