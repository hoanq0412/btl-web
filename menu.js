const searchInput = document.getElementById("searchInput");
const items = document.querySelectorAll(".menu-item");

searchInput.addEventListener("keyup", function() {
  const filter = searchInput.value.toLowerCase();

  items.forEach(item => {
    const name = item.dataset.name.toLowerCase();
    item.style.display = name.includes(filter) ? "block" : "none";
  });
});

const tickButtons = document.querySelectorAll(".tick-btn");
const totalAmount = document.getElementById("totalAmount");
const checkoutBtn = document.getElementById("checkoutBtn");

// Hàm tính tổng tiền
function updateTotal() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalAmount.textContent = total.toLocaleString("vi-VN") + "₫";
}

// Gọi khi load trang
updateTotal();

tickButtons.forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".menu-item");
    const name = item.dataset.name;
    const price = parseInt(item.dataset.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(i => i.name === name);

    if (existingItem) {
      // Bỏ chọn → xóa khỏi giỏ
      cart = cart.filter(i => i.name !== name);
      button.classList.remove("active");
    } else {
      // Thêm vào giỏ
      cart.push({ name, price, quantity: 1 });
      button.classList.add("active");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotal(); // cập nhật tổng ngay khi click
  });
});

// Xử lý nút Thanh Toán
checkoutBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("🛒 Giỏ hàng đang trống!");
    return;
  }

  let message = "🧾 Hóa đơn của bạn:\n\n";
  cart.forEach(item => {
    message += `${item.name} - ${item.price.toLocaleString("vi-VN")}₫\n`;
  });
  message += `\nTổng cộng: ${totalAmount.textContent}\n\nCảm ơn bạn đã mua hàng! ☕`;

  alert(message);

  // Xóa giỏ sau khi thanh toán
  localStorage.removeItem("cart");
  tickButtons.forEach(btn => btn.classList.remove("active"));
  updateTotal();
});



