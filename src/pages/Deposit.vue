<template>
  <q-page padding>
    <div class="column">
      <div>
        <h3 class="center">How much would you like to deposit today ?</h3>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-3">
          <q-input
            color="teal"
            bottom-slots
            outlined
            v-model="amount"
            min="0.01"
            :max="balance"
            label="Amount"
          >
            <template v-slot:append>
              <q-icon name="fab fa-ethereum" />
            </template>
            <template v-slot:hint>Min 0.01 ETH</template>
          </q-input>
        </div>
        <div class="col-9">
          <q-btn
            :disabled="amount < 0.01"
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
    <div v-if="isLoading">
      <q-linear-progress query color="cyan" class="q-mt-sm" />
    </div>
  </q-page>
</template>

<script>
import AccountMixin from "@/mixins/account";

export default {
  mixins: [AccountMixin],
  data() {
    return {
      amount: null,
    };
  },
  methods: {
    async deposit() {
      if (this.amount > this.balance) {
        alert("Amount can't be greater than balance!");
      }

      try {
        this.isLoading = true;

        await this.dbank.methods.deposit().send({
          value: this.toWei(this.amount).toString(),
          from: this.account,
        });
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>