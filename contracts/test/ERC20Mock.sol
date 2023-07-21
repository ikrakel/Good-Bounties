// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 ether);
    }
}

contract USDTMock is ERC20 {
    constructor() ERC20("USDT", "USDT") {
        _mint(msg.sender, 1000000 ether);
    }

    function decimals() public pure override(ERC20) returns (uint8) {
        return 6;
    }
}
