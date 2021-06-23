<template>
    <q-page padding>
        <h3>Hi there!</h3>
        <p>Account: {{account}}</p>
        <p>Balance: {{balance}} ETH</p>
    </q-page>
</template>

<script>

import AccountMixin from '@/mixins/account';

export default {
    mixins: [
        AccountMixin
    ]
}
</script>