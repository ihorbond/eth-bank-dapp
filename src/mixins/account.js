import Web3 from 'web3';
import Token from "@/abis/Token.json";
import Bank from "@/abis/dBank.json";

export default {
    data() {
        return {
            isLoading: false,
            networkId: null,
            account: '',
            balance: 0,
            web3: null,
            tokenContract: Token,
            dBankContract: Bank,
            token: null,
            dbank: null
        }
    },

    async beforeMount() {
        this.isLoading = true;

        if (typeof window.ethereum === "undefined") {
          alert("Metamask is not installed");
          return;
        }
    
        this.web3 = new Web3(window.ethereum);
        this.networkId = await this.web3.eth.net.getId();
        const accounts = await this.web3.eth.requestAccounts();
    
        if (accounts.length) {
          this.account = accounts[0];
          const balance = await this.web3.eth.getBalance(accounts[0]);
          this.balance = this.fromWei(balance);
        } else {
          console.debug("No accounts found");
        }

        this.token = new this.web3.eth.Contract(
          this.tokenContract.abi,
          this.tokenContract.networks[this.networkId]?.address
        );
        this.dbank = new this.web3.eth.Contract(
          this.dBankContract.abi,
          this.dBankContract.networks[this.networkId]?.address
        );
    
        this.isLoading = false;
    },

    methods: {
      toWei(amount, units = null) {
        return this.web3.utils.toWei(amount, units);
      },
      fromWei(amount) {
        return this.web3.utils.fromWei(amount);
      }
    }
}