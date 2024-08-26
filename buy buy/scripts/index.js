let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
let allItems = [];
let currentCategory = 'All'; // Default category to display all items

onLoad();

function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  
    // Initialize items
    allItems = items; // Assuming 'items' is your array of items
    displayItemsOnHomePage(); // Display items on page load
    displayBagIcon();
}
window.addEventListener("load", function () {
    setTimeout(function () {
      document.querySelector('.banner').classList.add('visible');
    }, 1000);
  });
  

function addToBag(itemId) {
    let existingItem = bagItems.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        bagItems.push({ id: itemId, quantity: 1 });
    }
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon() {
    let bagItemCountElement = document.querySelector('.bag-item-count');
    let totalQuantity = bagItems.reduce((total, item) => total + item.quantity, 0);
    
    if (totalQuantity > 0) {
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = totalQuantity;
    } else {
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayItemsOnHomePage(itemsToDisplay = allItems) {
    let itemsContainerElement = document.querySelector('.items-container');
    if (!itemsContainerElement) {
        return;
    }
    let innerHtml = '';
    itemsToDisplay.forEach(item => {
        innerHtml += `
        <div class="item-container" data-category="${item.category}">
            <img class="item-image" src="${item.image}" alt="item image">
            <div class="rating">
                ${item.rating.stars} ⭐ | ${item.rating.count}
            </div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add-bag" onclick="addToBag('${item.id}')">Add to Bag</button>
        </div>`;
    });
    itemsContainerElement.innerHTML = innerHtml;
}

function filterAndSearchItems() {
    let searchTerm = document.querySelector('.search_input').value.toLowerCase();
    let filteredItems = allItems.filter(item =>
        (item.category === currentCategory || currentCategory === 'All') &&
        (item.item_name.toLowerCase().includes(searchTerm) ||
        item.company.toLowerCase().includes(searchTerm))
    );
    displayItemsOnHomePage(filteredItems);
}

document.querySelectorAll('.nav_bar a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        currentCategory = this.textContent;
        filterAndSearchItems();
    });
});

document.querySelector('.search_input').addEventListener('input', filterAndSearchItems);
