import Vue from 'vue';

Vue.mixin({
  methods: {
    scrollToTop() {
      if (process.client) {
        window.scrollTo(0, 0);
      }
    }
  }
});
