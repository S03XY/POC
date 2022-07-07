// SPDX-License-Identifier:Non

pragma solidity 0.8.7;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";


contract POCERC20 is ERC20("POC TOKEN","POCT") {
    
    function anyonecanmint() external {
        uint _amount = 1 ether;
        _mint(msg.sender,_amount);
    }

    function anyonecanburn (uint amount) external {
        _burn(msg.sender,amount);
    }
    
}