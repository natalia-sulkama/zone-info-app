<template>
  <f7-toolbar bottom-md id="boss-quote" class="no-shadow no-hairline">
    <f7-block id="quote-container">
      <p class="p-serif"> {{ randomQuote }} </p>
    </f7-block>
  </f7-toolbar>
</template>

<script>
export default {
  data() {
    return {
      quotes: [
        { quote: 'The master has not been himself for quite some time. Perhaps a feast will brighten his spirit.' },
        { quote: 'May we see your invitation?' },
        { quote: 'Hmm, unannounced visitors. Preparations must be made...' },
        { quote: 'Please, no more! My son... He\'s gone mad!' },
        { quote: 'Excuse me, are you trying to sneak by without an invitation?' },
        { quote: 'Tonight, things are not what they seem... for tonight your eyes may not be trusted!' },
        { quote: 'The Menagerie is for guests only.' },
        { quote: 'The slightest loss of concentration is all it takes.' },
        { quote: 'Madness has brought you here to me. I shall be your undoing!' },
        { quote: 'Death comes. Will your conscience be clear?' },
        { quote: 'This day\'s black fate on more days doth depend. This but begins the woe. Others must end.' },
      ],
      randomQuote: ''
    }
  },
  created() {
    var bossQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.randomQuote = bossQuote.quote;
  }
}
</script>

<style lang="css" scoped>

  #boss-quote {
    letter-spacing: 1px;
    font-size: 10px;
    font-weight: 600;
    text-transform: full-width;
    font-style: italic;
    color: rgb(224, 132, 47);
    background: transparent !important;
    margin-bottom: 10px !important;
  }

  #quote-container {
    padding: 0 30px;
  }

</style>
