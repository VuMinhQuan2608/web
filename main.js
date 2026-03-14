document.getElementById('confirmOrderBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment').value;
    
    if (!name || !phone || !address) {
        return showToast('Vui lòng điền đầy đủ thông tin!', 'danger');
    }

    // Tạo đơn hàng mới
    const order = {
        id: Date.now(),
        date: new Date().toLocaleString('vi-VN'),
        customerName: name,
        phone: phone,
        address: address,
        payment: payment === 'cod' ? 'COD' : 'Chuyển khoản',
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: 'Chờ xác nhận'  // Có thể admin đổi thành 'Đang chuẩn bị', 'Đã giao', 'Hủy'
    };

    // Lưu vào localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    setTimeout(() => {
        bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
        showToast(`Đặt hàng thành công! Mã đơn: FH-${order.id.toString().slice(-6)}<br>Giao đến: ${address}`, 'success');
        
        cart = [];
        updateCartCount();
        renderCart();
    }, 800);
    // Trong phần setTimeout sau khi lưu order
localStorage.setItem('orders', JSON.stringify(orders));
window.dispatchEvent(new Event('storage'));  // Trigger event để admin có thể listen nếu muốn
});