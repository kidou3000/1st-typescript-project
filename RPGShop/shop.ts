// コンソール版RPGショップシミュレーション（イース風）

const readline = require("readline");

// 商品データとプレイヤー情報
const shopItems = [
  { id: 1, name: "ポーション", price: 50, description: "HPを50回復" },
  { id: 2, name: "エリクサー", price: 150, description: "HPを完全回復" },
  { id: 3, name: "剣", price: 500, description: "攻撃力を上昇" },
];

let playerGold = 300;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayShop() {
  console.clear();
  console.log("==================== RPGの店 ====================");
  console.log(`所持金: ${playerGold} G\n`);
  console.log("販売中の商品:");

  shopItems.forEach((item) => {
    console.log(
      `[${item.id}] ${item.name} - ${item.price}G: ${item.description}`
    );
  });

  console.log("\n購入したい商品の番号を入力するか、'終了'と入力してください。");
}

function handlePurchase(input: string) {
  const itemId = parseInt(input);

  if (isNaN(itemId)) {
    console.log("無効な入力です。有効な商品番号または'終了'と入力してください。");
    return;
  }

  const item = shopItems.find((i) => i.id === itemId);

  if (!item) {
    console.log("その商品は存在しません。もう一度お試しください。");
    return;
  }

  if (playerGold >= item.price) {
    playerGold -= item.price;
    console.log(`${item.name}を購入しました！`);
  } else {
    console.log("所持金が足りません！");
  }
}

function startShop() {
  displayShop();

  rl.on("line", (input: string) => {
    if (input.toLowerCase() === "終了") {
      console.log("ご利用ありがとうございました。またのお越しをお待ちしております！");
      rl.close();
      return;
    }

    handlePurchase(input);
    setTimeout(() => {
      displayShop();
    }, 500); // インタラクティブ感を高めるための短い遅延
  });
}

startShop();
