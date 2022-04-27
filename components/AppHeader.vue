<template>
  <div>
    <SfHeader
      data-cy="app-header"
      :search-value="term"
      :cart-items-qty="cartTotalItems"
      :account-icon="accountIcon"
      class="sf-header--has-mobile-search"
      :class="{ 'header-on-top': isSearchOpen }"
      @click:cart="toggleCartSidebar"
      @click:wishlist="toggleWishlistSidebar"
      @click:account="handleAccountClick"
      @enter:search="changeSearchTerm"
      @change:search="(p) => (term = p)"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link :to="localePath('/')" class="sf-header__logo">
          <SfImage
            src="/icons/logo.svg"
            alt="Vue Storefront Next"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>

      <template v-if="categories.length > 0" #navigation>
        <div class="navigation-wrapper">
          <SfHeaderNavigationItem
            v-for="cat in categories"
            :key="cat.id"
            class="nav-item"
            :data-cy="'app-header-url_' + cat.handle"
            :label="cat.title"
            :link="localePath('/c/' + cat.handle)"
          />
        </div>
      </template>
      <template v-else #navigation>
        <nuxt-link to="/categories">Categories</nuxt-link>
      </template>
      <template #aside> </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            v-e2e="'app-header-account'"
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton>

          <SfButton
            class="sf-button--pure sf-header__action"
            @click="toggleWishlistSidebar"
          >
            <SfIcon class="sf-header__icon" icon="heart" size="1.25rem" />
          </SfButton>

          <SfButton
            v-e2e="'app-header-cart'"
            class="sf-button--pure sf-header__action"
            @click="gotoCart"
          >
            <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />
            <SfBadge
              v-if="cartTotalItems"
              class="sf-badge--number cart-badge"
              >{{ cartTotalItems }}</SfBadge
            >
          </SfButton>
        </div>
      </template>

      <template #search>
        <SfSearchBar
          placeholder="Search for items"
          :value="term"
          :icon="{ size: '1.25rem', color: '#43464E' }"
          aria-label="Search"
          @focus="isSearchOpen = true"
        ></SfSearchBar>
      </template>
    </SfHeader>
    <SfOverlay :visible="isSearchOpen" @click="isSearchOpen = false" />
  </div>
</template>

<script type="module" lang="ts">
import {
  SfHeader,
  SfImage,
  SfButton,
  SfBadge,
  SfSearchBar,
  SfIcon,
  SfOverlay,
} from "@storefront-ui/vue";
import useUiState from "~/composables/useUiState";
import { ref, useRouter } from "@nuxtjs/composition-api";

import useUiHelpers from "~/composables/useUiHelpers";

export default {
  components: {
    SfHeader,
    SfImage,
    SfIcon,
    SfButton,
    SfOverlay,
    SfBadge,
    SfSearchBar,
  },
  setup() {
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } =
      useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();

    const curCatSlug = ref(getFacetsFromURL().categorySlug);

    const cartTotalItems = 0;

    const accountIcon = "profile";

    const router = useRouter();

    const handleAccountClick = () => {
      toggleLoginModal();
    };

    // #region Search Section
    const isSearchOpen = ref(false);
    const searchResults = ref(null);
    const term = ref(getFacetsFromURL().term);

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      term,
      curCatSlug,
      searchResults,
      isSearchOpen,
      gotoCart: () => router.push("/cart"),
      categories: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding: var(--spacer-sm);
  margin-bottom: var(--spacer-xl);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
    height: 100%;
  }
}
.header-on-top {
  z-index: 2;
}
.navigation-wrapper {
  display: flex;
  white-space: nowrap;
}
.nav-item {
  .sf-header-navigation-item__item--mobile {
    display: none;
  }
  &--mobile {
    padding: var(--spacer-xs) 0;
  }
}
.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
</style>
