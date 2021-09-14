const GreeterContract = artifacts.require("Greeter");

contract("Greeter", (accounts) => {
  it("has been deployed successfully", async () => {
    const greeter = await GreeterContract.deployed();
    assert(greeter, "contract was not deployed");
  });

  describe("greet()", () => {
    it("returns 'hi there'", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "Hello World!";
      const actual = await greeter.greet();
      assert.equal(actual, expected, "greeted with 'hello  world!'");
    });
  });

  describe("owner()", () => {
    it("returns the address of the owner", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      assert(owner, "the current owner!");
    });
    it("matches the addreess that originally deployed the contract", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      const expected = accounts[0];
      assert.equal(owner, expected, "matches address used to deploy contract");
    });
  });
});

contract("Greeter: update greeting", (accounts) => {
  describe("setGreeting(strinng)", () => {
    describe("when message is sent by the owner", () => {
      it("sets greeting to passed in string", async () => {
        const greeter = await GreeterContract.deployed();
        const expected = "Hi there!";

        await greeter.setGreeting(expected);
        const actual = await greeter.greet();
        assert.equal(actual, expected, "greeting was not updated");
      });
    });
    describe("when message is sent by another account", () => {
      it("does not set the greeting", async () => {
        const greeter = await GreeterContract.deployed();
        try {
          await greeter.setGreeting("Not the owner", { from: accounts[1] });
        } catch (err) {
          const errorMessage = "Ownable: caller is not the owner";
          console.log(err.reason);
          console.log(errorMessage);
          assert.equal(err.reason, errorMessage, "Greeting should not update");
          return;
        }
        assert(false, "greeting should not update");
      });
    });
  });
});
