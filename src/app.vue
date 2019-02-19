<template>
  <f7-app :params="f7params">
    <f7-statusbar></f7-statusbar>
    <f7-view id="main-view" url="/" main>
      <boss-quote></boss-quote>
    </f7-view>
  </f7-app>
</template>

<script>
import routes from './routes.js'
import bossQuote from 'components/bossQuote.vue'

export default {
  data() {
    return {
      f7params: {
        name: 'Karazhan',
        routes: routes,
        statusbar: {
          enabled: false,
        },
      },
    }
  },
    components: {
    'boss-quote': bossQuote
  }
}
</script>
