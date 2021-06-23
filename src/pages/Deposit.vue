<template>
    <q-page padding>
    <div class="column">
      <div>
        <h3 class="center">How much would you like to deposit today ?</h3>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-input color="teal" bottom-slots outlined v-model="amount" label="Amount">
            <template v-slot:append>
              <q-icon name="fab fa-ethereum" />
            </template>
            <template v-slot:hint> Min 0.01 ETH </template>
          </q-input>
        </div>
        <div class="col-8">
          <q-btn
            bottom-slots
            size="lg"
            :loading="isLoading"
            color="secondary"
            label="Deposit"
            @click="deposit"
          />
        </div>
      </div>
    </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            amount: null
        }
    },
    methods: {
        deposit() {
            console.log(this.amount);
        }
    }
}
</script>