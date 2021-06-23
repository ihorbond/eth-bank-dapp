<template>
    <div>
        <h1>Welcome to the DBank!</h1>
        {{account}}
    </div>
</template>

<script>

import Web3 from 'web3';
import Token from '@/abis/Token.json';
import dBank from '@/abis/dBank.json';

export default {
    data() {
        return {
            balance: 0,
            account: null,
            token: Token,
            dBank: dBank
        }
    },

    async beforeMount() {
        if(typeof window.ethereum === 'undefined') {
            alert("Metamask is not installed");
            return;
        }
        
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.requestAccounts();
        
        if(accounts.length) {
            this.account = accounts[0];
            this.balance = await web3.eth.getBalance(accounts[0])
            console.log(networkId, web3.utils.fromWei(this.balance));
        }
        else {
            console.debug("No accounts found");
        }

        // console.log(this.token, this.dBank);

        const token = new web3.eth.Contract(this.token.abi, this.token.networks[networkId]?.address);
        const dbank = new web3.eth.Contract(this.dBank.abi, this.dBank.networks[networkId]?.address);

        console.log(token, dbank);
    }
}
</script>