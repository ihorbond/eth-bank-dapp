<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="fas fa-bars"
        />

        <q-toolbar-title> DBank App </q-toolbar-title>

        <div>
          <img width="40px" height="40px" src="./dbank.png" alt="logo" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Welcome back!</q-item-label>
        <q-skeleton v-if="isLoading" type="rect" />
        <q-item-label v-else>Balance: {{balance}} ETH</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="fas fa-piggy-bank" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Deposit</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.com/quasarframework/"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-money-check-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Withdraw</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Web3 from "web3";


export default {
  name: "LayoutDefault",
  
  data() {
    return {
      leftDrawerOpen: false,
      isLoading: true,
      balance: 0,
      account: ''
    };
  },

  async beforeMount() {
    if (typeof window.ethereum === "undefined") {
      alert("Metamask is not installed");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.requestAccounts();

    if (accounts.length) {
      this.account = accounts[0];
      const balance = await web3.eth.getBalance(accounts[0]);
      this.balance = web3.utils.fromWei(balance);
      console.log(networkId, this.balance);
    } else {
      console.debug("No accounts found");
    }

    this.isLoading = false;
  },

};
</script>

<style></style>
