// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./Token.sol";

contract dBank {

  Token private _token;

  mapping(address => uint) public etherBalanceOf;
  mapping(address => uint) public depositStart;
  mapping(address => bool) public isDeposited;

  event Deposit(address indexed user, uint etherAmount, uint timeStart);
  event Withdraw(address indexed user, uint etherAmount, uint timeStart, uint interest);

  //pass as constructor argument deployed Token contract
  constructor(Token token) public {
    _token = token;
  }

  function deposit() payable public {
    //check if msg.sender didn't already deposited funds
    require(!isDeposited[msg.sender], 'Deposit is already active');

    //check if msg.value is >= than 0.01 ETH
    require(msg.value >= 1e16, 'Deposit should be greated than 0.01 ETH');

    //increase msg.sender ether deposit balance
    etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;

    //start msg.sender hodling time
    depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;

    //set msg.sender deposit status to true
    isDeposited[msg.sender] = true;

    //emit Deposit event
    emit Deposit(msg.sender, msg.value, block.timestamp);
  }

  function withdraw() public {
    //check if msg.sender deposit status is true
    require(isDeposited[msg.sender], 'Error, no previous deposits');

    //check user's hodl time
    uint depositDuration = block.timestamp - depositStart[msg.sender];

    //calc interest per second
    uint interestPerSecond = 31668017 * (etherBalanceOf[msg.sender] / 1e16);

    //calc accrued interest
    uint interest = interestPerSecond * depositDuration;

    //send eth to user
    msg.sender.transfer(etherBalanceOf[msg.sender]);

    //send interest in tokens to user
    _token.mint(msg.sender, interest);

    //reset depositer data
    etherBalanceOf[msg.sender] = 0;
    depositStart[msg.sender] = 0;
    isDeposited[msg.sender] = false;

    //emit event
    uint userBalance = etherBalanceOf[msg.sender];
    emit Withdraw(msg.sender, userBalance, depositDuration, interest);
  }

  function borrow() payable public {
    //check if collateral is >= than 0.01 ETH
    //check if user doesn't have active loan

    //add msg.value to ether collateral

    //calc tokens amount to mint, 50% of msg.value

    //mint&send tokens to user

    //activate borrower's loan status

    //emit event
  }

  function payOff() public {
    //check if loan is active
    //transfer tokens from user back to the contract

    //calc fee

    //send user's collateral minus fee

    //reset borrower's data

    //emit event
  }
}