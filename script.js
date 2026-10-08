let player = {
  level: 1,
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  exp: 0,
  maxExp: 100,
  gold: 100,
  potion: 3,
  attack: 15
};

let enemy = {};

const enemies = [
  {
    name: "Wild Wolf",
    icon: "🐺",
    hp: 80,
    attack: 8,
    exp: 30,
    gold: 25
  },
  {
    name: "Goblin",
    icon: "👺",
    hp: 120,
    attack: 12,
    exp: 45,
    gold: 40
  },
  {
    name: "Dark Orc",
    icon: "👹",
    hp: 180,
    attack: 18,
    exp: 70,
    gold: 65
  },
  {
    name: "Shadow Dragon",
    icon: "🐉",
    hp: 300,
    attack: 25,
    exp: 120,
    gold: 150
  }
];

function newEnemy() {
  const random = enemies[Math.floor(Math.random() * enemies.length)];

  enemy = {
    ...random,
    maxHp: random.hp
  };

  updateScreen();
  log(`⚠️ ${enemy.icon} ${enemy.name} muncul!`);
}

function attack() {
  if (enemy.hp <= 0) return;

  const damage = Math.floor(
    player.attack + Math.random() * 10
  );

  enemy.hp -= damage;

  log(`⚔️ Kamu memberikan ${damage} damage!`);

  if (enemy.hp <= 0) {
    winBattle();
    return;
  }

  enemyAttack();
  updateScreen();
}

function skill() {
  if (enemy.hp <= 0) return;

  if (player.mp < 15) {
    log("❌ MP tidak cukup!");
    return;
  }

  player.mp -= 15;

  const damage = Math.floor(
    player.attack * 2 + Math.random() * 20
  );

  enemy.hp -= damage;

  log(`🔥 Fire Strike memberikan ${damage} damage!`);

  if (enemy.hp <= 0) {
    winBattle();
    return;
  }

  enemyAttack();
  updateScreen();
}

function enemyAttack() {
  const damage = Math.floor(
    enemy.attack + Math.random() * 6
  );

  player.hp -= damage;

  log(`💥 ${enemy.name} menyerang dan memberikan ${damage} damage!`);

  if (player.hp <= 0) {
    player.hp = 0;

    log("💀 Kamu kalah! HP dipulihkan.");

    setTimeout(() => {
      player.hp = player.maxHp;
      player.mp = player.maxMp;
      updateScreen();
    }, 1200);
  }
}

function winBattle() {
  const rewardExp = enemy.exp;
  const rewardGold = enemy.gold;

  player.exp += rewardExp;
  player.gold += rewardGold;

  log(
    `🏆 ${enemy.name} dikalahkan! +${rewardExp} EXP +${rewardGold} Gold`
  );

  checkLevelUp();

  setTimeout(newEnemy, 1000);
}

function checkLevelUp() {
  if (player.exp >= player.maxExp) {

    player.exp -= player.maxExp;

    player.level++;

    player.maxExp += 50;

    player.maxHp += 25;
    player.maxMp += 10;
    player.attack += 5;

    player.hp = player.maxHp;
    player.mp = player.maxMp;

    log(`🎉 LEVEL UP! Sekarang level ${player.level}!`);
  }
}

function usePotion() {
  if (player.potion <= 0) {
    log("❌ Potion habis!");
    return;
  }

  if (player.hp >= player.maxHp) {
    log("❤️ HP kamu sudah penuh!");
    return;
  }

  player.potion--;

  player.hp += 50;

  if (player.hp > player.maxHp) {
    player.hp = player.maxHp;
  }

  log("🧪 Potion digunakan! HP +50");

  updateScreen();
}

function runAway() {
  log("🏃 Kamu berhasil melarikan diri!");

  setTimeout(newEnemy, 700);
}

function openInventory() {
  document.getElementById("popupContent").innerHTML = `
    <h2>🎒 Inventory</h2>

    <div class="item">
      <span>🧪 Health Potion</span>
      <b>x${player.potion}</b>
    </div>

    <div class="item">
      <span>⚔️ Weapon</span>
      <b>+${player.attack} ATK</b>
    </div>

    <div class="item">
      <span>💰 Gold</span>
      <b>${player.gold}</b>
    </div>
  `;

  showPopup();
}

function openShop() {
  document.getElementById("popupContent").innerHTML = `
    <h2>🏪 Shop</h2>

    <div class="item">
      <span>🧪 Health Potion - 30 Gold</span>
      <button onclick="buyPotion()">BELI</button>
    </div>

    <div class="item">
      <span>⚔️ Upgrade Attack - 100 Gold</span>
      <button onclick="upgradeAttack()">UPGRADE</button>
    </div>
  `;

  showPopup();
}

function buyPotion() {
  if (player.gold < 30) {
    alert("Gold tidak cukup!");
    return;
  }

  player.gold -= 30;
  player.potion++;

  log("🧪 Membeli 1 Potion.");

  openShop();
  updateScreen();
}

function upgradeAttack() {
  if (player.gold < 100) {
    alert("Gold tidak cukup!");
    return;
  }

  player.gold -= 100;
  player.attack += 10;

  log("⚔️ Attack berhasil di-upgrade +10!");

  openShop();
  updateScreen();
}

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function log(text) {
  document.getElementById("log").innerHTML =
    `<p>${text}</p>`;
}

function updateScreen() {

  document.getElementById("level").textContent =
    player.level;

  document.getElementById("gold").textContent =
    player.gold;

  document.getElementById("hp").textContent =
    player.hp;

  document.getElementById("maxHp").textContent =
    player.maxHp;

  document.getElementById("mp").textContent =
    player.mp;

  document.getElementById("maxMp").textContent =
    player.maxMp;

  document.getElementById("exp").textContent =
    player.exp;

  document.getElementById("maxExp").textContent =
    player.maxExp;

  document.getElementById("hpBar").style.width =
    (player.hp / player.maxHp * 100) + "%";

  document.getElementById("mpBar").style.width =
    (player.mp / player.maxMp * 100) + "%";

  document.getElementById("expBar").style.width =
    (player.exp / player.maxExp * 100) + "%";

  document.getElementById("enemyName").textContent =
    enemy.icon + " " + enemy.name;

  document.getElementById("enemyIcon").textContent =
    enemy.icon;

  document.getElementById("enemyHp").textContent =
    Math.max(0, enemy.hp);

  document.getElementById("enemyMaxHp").textContent =
    enemy.maxHp;

  document.getElementById("enemyHpBar").style.width =
    Math.max(0, enemy.hp / enemy.maxHp * 100) + "%";
}

function saveGame() {
  localStorage.setItem(
    "panowzRPG",
    JSON.stringify(player)
  );

  log("💾 Progress berhasil disimpan!");
}

function loadGame() {
  const saved = localStorage.getItem("panowzRPG");

  if (saved) {
    player = JSON.parse(saved);
  }
}

// Mulai game
loadGame();
newEnemy();