import Web3 from 'web3'

export default {
    data() {
        return {
            isLoading: false,
            networkId: null,
            account: '',
            balance: 0
        }
    },

    async beforeMount() {
        this.isLoading = true;

        if (typeof window.ethereum === "undefined") {
          alert("Metamask is not installed");
          return;
        }
    
        const web3 = new Web3(window.ethereum);
        this.networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.requestAccounts();
    
        if (accounts.length) {
          this.account = accounts[0];
          const balance = await web3.eth.getBalance(accounts[0]);
          this.balance = web3.utils.fromWei(balance);
        } else {
          console.debug("No accounts found");
        }
    
        this.isLoading = false;
      }
}