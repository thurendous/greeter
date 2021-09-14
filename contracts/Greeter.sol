//SPDX-License-Identifier:MIT
pragma solidity >=0.4.0 <0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Greeter is Ownable {
    string private sentence = "Hello World!";
    address private _owner;

    // constructor() public {
    //     _owner = msg.sender;
    // }

    // modifier onlyOwner() {
    //     require(msg.sender == _owner, "Ownable: caller is not the owner.");
    //     _;
    // }

    // function owner() public view returns (address) {
    //     return _owner;
    // }

    function greet() external view returns (string memory) {
        return sentence;
    }

    function setGreeting(string calldata _sentence) external onlyOwner {
        sentence = _sentence;
    }
}
