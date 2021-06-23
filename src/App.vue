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
          <img width="40px" height="40px" src="./assets/dbank.png" alt="logo" />
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
        <q-item clickable :to="{ name: 'Home' }">
          <q-item-section avatar>
            <q-icon name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'Deposit' }">
          <q-item-section avatar>
            <q-icon name="fas fa-piggy-bank" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Deposit</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'Withdraw' }">
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

export default {
  name: "LayoutDefault",
  
  data() {
    return {
      leftDrawerOpen: false
    };
  },

};
</script>

<style></style>
