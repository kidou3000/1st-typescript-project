const canvas = document.getElementById("shopCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Canvas not supported!");
}

// 基本設定
const shopItems = [
  { id: 1, name: "Potion", price: 50 },
  { id: 2, name: "Elixir", price: 150 },
  { id: 3, name: "Sword", price: 500 },
];

let playerGold = 300;

// 描画関数
function drawShop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "20px Arial";
  ctx.fillText(`Gold: ${playerGold}`, 10, 30);

  shopItems.forEach((item, index) => {
    ctx.fillText(`${item.name} - ${item.price}G`, 10, 60 + index * 30);
  });

  ctx.fillText("Click to buy (Potion: 1, Elixir: 2, Sword: 3)", 10, 150);
}

// 購入処理
function buyItem(itemId: number) {
  const item = shopItems.find((i) => i.id === itemId);
  if (!item) return;

  if (playerGold >= item.price) {
    playerGold -= item.price;
    alert(`You bought a ${item.name}!`);
  } else {
    alert("Not enough gold!");
  }

  drawShop();
}

// クリックイベントの登録
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (y > 50 && y < 80) buyItem(1); // Potion
  else if (y > 80 && y < 110) buyItem(2); // Elixir
  else if (y > 110 && y < 140) buyItem(3); // Sword
});

// 初期描画
drawShop();
