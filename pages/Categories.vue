<template>
  <div id="categories">
    <LazyHydrate when-visible>
      <SfLoader v-if="categoriesLoading" />
      <SfList v-else>
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
        </li>
      </SfList>
    </LazyHydrate>
  </div>
</template>

<script lang="ts">
import { onSSR } from "@vue-storefront/core";
import LazyHydrate from "vue-lazy-hydration";
import { useCategory } from "~/stubVueStorefrontIntegration/composables";
import { SfLoader, SfList } from "@storefront-ui/vue";

export default {
  name: "Categories",
  components: {
    LazyHydrate,
    SfLoader,
    SfList,
  },
  setup() {
    const {
      search,
      categories,
      loading: categoriesLoading,
    } = useCategory("");

    onSSR(async () => {
      await search({});
    });

    return {
      categories,
      categoriesLoading,
    };
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
