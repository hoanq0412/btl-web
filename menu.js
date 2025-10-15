const searchInput = document.getElementById("searchInput");
const items = document.querySelectorAll(".menu-item");

searchInput.addEventListener("keyup", function() {
  const filter = searchInput.value.toLowerCase();

  items.forEach(item => {
    const name = item.dataset.name.toLowerCase();
    item.style.display = name.includes(filter) ? "block" : "none";
  });
});
