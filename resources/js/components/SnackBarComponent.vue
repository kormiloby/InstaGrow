<template>
  <v-snackbar
    :timeout="snackbarTimeout"
    :color="snackbarColor"
    v-model="snackbarShow"
    :multi-line="true"
    :vertical="vertical"
  >
    {{ snackbarText }}<br/>
    {{ snackbarSubtext }}

    <template  v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        color="balk"
        v-bind="attrs"
        @click.native="close"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as mutations from '../store/mutation-types'

  export default {
    data: () => ({
       vertical: true,
    }),
    computed: {
      ...mapGetters([
        'snackbarShow',
        'snackbarColor',
        'snackbarText',
        'snackbarSubtext',
        'snackbarTimeout',
      ])
    },
    methods: {
      close () {
        this.$store.commit(mutations.SET_SNACKBAR_SHOW, false)
      }
    }
  }
</script>
