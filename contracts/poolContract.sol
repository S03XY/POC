// SPDX-License-Identifier:None

pragma solidity 0.8.7;


contract POC {
    address public owner;

    event Received (address indexed sender, uint amount);

    constructor (){
        owner = msg.sender;
    }

    modifier CheckOwner{
        require (msg.sender == owner,"Not owner");
        _;
    }

    function withdrawEth (uint amount) CheckOwner external {
        (bool status,)=owner.call{value:amount}("");
        require(status == true,"Eth withdrawal failed");
    }

    function getcontractbalance () view external  returns(uint){
        return address(this).balance;
    }

    function widthdrawERC20 (uint amount,address token) CheckOwner external {
        (bool status,)=token.call(abi.encodeWithSignature("transfer(address,uint256)",owner,amount));
        require(status == true,"withdrawal failed");
    }

    receive () CheckOwner payable external {
            emit Received(msg.sender,msg.value);
    }  

    fallback() external{}




}