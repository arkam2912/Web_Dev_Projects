const CONVENIENCE_FEES = 99;
let bagItemObjects = [];

onLoad();

function onLoad() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary() {
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = bagItemObjects.reduce((acc, item) => acc + item.quantity, 0);
    let totalMRP = 0;
    let totalDiscount = 0;

    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price * bagItem.quantity;
        totalDiscount += (bagItem.original_price - bagItem.current_price) * bagItem.quantity;
    });

    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

    bagSummaryElement.innerHTML = `
        <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
                <span class="price-item-tag">Total MRP</span>
                <span class="price-item-value">₹${totalMRP}</span>
            </div>
            <div class="price-item">
                <span class="price-item-tag">Discount on MRP</span>
                <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
            </div>
            <div class="price-item">
                <span class="price-item-tag">Convenience Fee</span>
                <span class="price-item-value">₹99</span>
            </div>
            <hr>
            <div class="price-footer">
                <span class="price-item-tag">Total Amount</span>
                <span class="price-item-value">₹${finalPayment}</span>
            </div>
        </div>
        <button class="btn-place-order" id="rzp-button">
            <div class="css-xjhrni">PLACE ORDER</div>
        </button>
    `;
    document.getElementById('rzp-button').onclick = function (e) {
        e.preventDefault();
        const amountInPaise = finalPayment * 100; 
        var options = {
            "key": "rzp_test_jFaf13SBQLS2HA", 
            "amount": amountInPaise,
            "currency": "INR",
            "name": "buy buy",
            "description": "Final Transaction",
            "image": "/images/images.png",
            "handler": function (response) {
                alert("Payment Done...");
                alert("Payment Id: " + response.razorpay_payment_id);
            },
            "prefill": {
                "name": "Customer Name",
                "email": "CustomerEmail@example.com",
                "contact": "CustomerPhoneNo"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        
        var rzp1 = new Razorpay(options);
        rzp1.open();
    };
}


function loadBagItemObjects() {
    bagItemObjects = bagItems.map(bagItem => {
        return {
            ...items.find(item => item.id === bagItem.id),
            quantity: bagItem.quantity
        };
    });
}

function displayBagItems() {
    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHTML(bagItem);
    });
    containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
    let itemInBag = bagItems.find(item => item.id === itemId);
    if (itemInBag) {
        itemInBag.quantity -= 1;
        if (itemInBag.quantity <= 0) {
            bagItems = bagItems.filter(item => item.id !== itemId);
        }
    }
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function generateItemHTML(item) {
  return `
      <div class="bag-item-container">
          <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
          </div>
          <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                  <span class="current-price">Rs ${item.current_price}</span>
                  <span class="original-price">Rs ${item.original_price}</span>
                  <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                  <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                  Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
              <div class="item-rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
              <div class="quantity">
                  <button onclick="removeFromBag('${item.id}')">-</button>
                  <span>${item.quantity}</span>
              </div>
          </div>
      </div>`;
}
