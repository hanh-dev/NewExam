document.getElementById('addProduct').addEventListener('click', function() {
    // Lấy giá trị từ các input
    const productImage = document.getElementById('productImage').value;
    const productName = document.getElementById('productName').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const unitPriceOld = document.getElementById('unitPriceOld').value;
    const typeProduct = document.getElementById('typeProduct').value;

    // Kiểm tra nếu các trường cần thiết không được điền
    if (!productImage || !productName || !unitPrice || !typeProduct) {
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        return;
    }

    const productCode = 'KO' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  
    const card = `
        <div class="card col-md-4" data-product-code="${productCode}">
            <img src="${productImage}" class="card-img-top" alt="Product Image">
            <div class="card-body">
                <p class="card-product-top">${productName} <span>${productCode}</span></p>
                <p class="card-text">
                    <span class="card-price">${unitPrice}<span class="old">${unitPriceOld}</span></span>
                </p>
                <button class="btn btn-primary btn-buy">Mua</button>
            </div>
        </div>
    `;
    document.getElementById('productCards').insertAdjacentHTML('beforeend', card);

    document.getElementById('productImage').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('unitPrice').value = '';
    document.getElementById('unitPriceOld').value = '';
    document.getElementById('typeProduct').value = '';
});

document.getElementById('searchProduct').addEventListener('click', function() {

    const searchCode = document.getElementById('searchCode').value.trim().toUpperCase();

    const cards = document.querySelectorAll('#productCards .card');
    cards.forEach(card => {
        const productCode = card.getAttribute('data-product-code');
        if (productCode.includes(searchCode)) {
            card.style.display = 'block'; 
        } else {
            card.style.display = 'none';   
        }
    });
    const visibleCards = Array.from(cards).some(card => card.style.display === 'block');
    if (!visibleCards) {
        alert('Không tìm thấy sản phẩm nào với mã này.');
    }
});

