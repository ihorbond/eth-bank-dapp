<template>
  <q-page padding>
    <div class="column">
      <div>
        <h3 class="center">How much would you like to withdraw today ?</h3>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-3">
          <q-input
            color="teal"
            bottom-slots
            outlined
            v-model="amount"
            label="Amount"
          >
            <template v-slot:append>
              <q-icon name="fab fa-ethereum" />
            </template>
            <template v-slot:hint>Available: {{ balance }} </template>
          </q-input>
        </div>
        <div class="col-9">
          <q-btn
            :disabled="amount < 0.01"
            size="lg"
            :loading="isLoading"
            color="secondary"
            label="Withdraw"
            @click="withdraw"
          />
        </div>
      </div>
      <div v-if="isLoading">
        <q-linear-progress query color="cyan" class="q-mt-sm" />
      </div>
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
    async withdraw() {
      if (this.amount < 0.01) {
        alert("Min amount is 0.01");
        return;
      }

      try {
        this.isLoading = true;

        await this.dbank.methods.withdraw().send({
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