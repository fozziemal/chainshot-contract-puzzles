const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck

    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;
    
    let signer = ethers.provider.getSigner(0);
    
    let wallet = new ethers.Wallet(ethers.Wallet.createRandom(), ethers.provider);
    
    while (wallet.address >= threshold) {
      wallet = new ethers.Wallet(ethers.Wallet.createRandom(), ethers.provider);
    }

    // send some ETH to our newly created wallet!
    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseUnits("1", "ether"),
    });
    
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
