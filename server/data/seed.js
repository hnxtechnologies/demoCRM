const store = require("./store");

function seedDemoData() {
  for (let i = 0; i < 8; i += 1) {
    store.simulateRandomSale();
  }
}

module.exports = { seedDemoData };
