// Khai báo các biến
const productImage = document.querySelector('#productImage');
const productName = document.querySelector('#productName');
const productType = document.querySelector('#productType');
const productNewPrice = document.querySelector('#productNewPrice');
const productOldPrice = document.querySelector('#productOldPrice');
const findItem = document.querySelector('#findItem');
const mensFashionContent = document.querySelector('#mensFashionContent');
const womensFashionContent = document.querySelector('#womensFashionContent');
const categoryButtons = document.querySelectorAll('.category-selection button');

let selectedCategory = 'all'; 

// Xử lý khi chọn nhóm
categoryButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        selectedCategory = event.target.id === 'mensFashion' ? 'mens' : 'womens';
        updateCategoryVisibility();
    });
});

// Cập nhật hiển thị của nhóm nội dung dựa trên lựa chọn
const updateCategoryVisibility = () => {
    if (selectedCategory === 'mens') {
        mensFashionContent.style.display = 'block';
        womensFashionContent.style.display = 'none';
    } else if (selectedCategory === 'womens') {
        mensFashionContent.style.display = 'none';
        womensFashionContent.style.display = 'block';
    } else {
        mensFashionContent.style.display = 'block';
        womensFashionContent.style.display = 'block';
    }
};


const checkProductMatch = (card, name, type, newPrice, oldPrice) => {
    const cardName = card.querySelector('.card-name').textContent.trim().toLowerCase();
    const cardType = card.querySelector('.card-type').textContent.trim().toLowerCase();
    const cardNewPrice = parseFloat(card.querySelector('.newPrice').textContent.replace('VND', '').replace(/\./g, '').trim());
    const cardOldPrice = parseFloat(card.querySelector('.oldPrice').textContent.replace('VND', '').replace(/\./g, '').trim());

    return (
        (name === '' || cardName.includes(name)) &&
        (type === '' || cardType.includes(type)) &&
        (isNaN(newPrice) || cardNewPrice === newPrice) &&
        (isNaN(oldPrice) || cardOldPrice === oldPrice)
    );
};

// Sự kiện khi nhấn nút tìm kiếm
findItem.addEventListener('click', () => {
    const name = productName.value.trim().toLowerCase();
    const type = productType.value.trim().toLowerCase();
    const newPrice = parseFloat(productNewPrice.value.trim().replace(/\./g, ''));
    const oldPrice = parseFloat(productOldPrice.value.trim().replace(/\./g, ''));

    let found = false;

    // Lấy tất cả sản phẩm trong cả hai nhóm
    const allCards = [...mensFashionContent.querySelectorAll('.card-hold'), 
                      ...womensFashionContent.querySelectorAll('.card-hold')];

    allCards.forEach(card => {
        if (checkProductMatch(card, name, type, newPrice, oldPrice)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none'; 
        }
    });

    if (!found) {
        alert('Không có bất cứ sản phẩm nào khớp với thông tin tìm kiếm.');
    }
});
