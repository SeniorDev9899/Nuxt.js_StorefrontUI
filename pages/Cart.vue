<template>
  <div id="cart">
    <div class="detailed-cart">
      <div v-if="totalItems" class="detailed-cart__aside">
        <!-- Order Summary With Calculation of Price (Product's Number/Subtotal Price/Shipping Price/Total Price) -->

        <SfOrderSummary
          id="order-summary"
          orderTitle="Total"
          :orderTitleLevel="2"
          :order="getOrder"
          :propertiesNames="['Products', 'Subtotal', 'Shipping', 'Total price']"
        />

        <!-- Check Out & Continue Shopping -->

        <SfButton class="sf-button--full-width checkout">Check out</SfButton>
        <SfButton
          class="sf-button--full-width color-primary continue-shopping"
          :disabled="disabled"
          >Continue Shopping</SfButton
        >
      </div>
      <div class="detailed-cart__main">
        <transition name="sf-fade" mode="out-in">
          <div
            v-if="totalItems"
            key="detailed-cart"
            class="collected-product-list"
          >
            <transition-group name="sf-fade" tag="div">
              <!-- Product Collection with details -->

              <SfCollectedProduct
                v-for="product in products"
                :key="product.id"
                v-model="product.qty"
                :image="product.image"
                :title="product.title"
                :regular-price="
                  product.price.regular && `$${product.price.regular}`
                "
                class="
                  sf-collected-product--detailed
                  collected-product
                  cart-item
                "
                @input="handleAction(product)"
              >
                <!-- Product Name & Price & detail (size, color) -->

                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(property, key) in product.configuration"
                      :key="key"
                      :name="property.name"
                      :value="property.value"
                    />
                  </div>
                </template>

                <!-- Edit/Save/Add to Compare -->

                <template #actions>
                  <div class="actions desktop-only">
                    <SfButton class="sf-button--text actions__button"
                      >Edit</SfButton
                    >
                    <SfButton class="sf-button--text actions__button"
                      >Save for later</SfButton
                    >
                    <SfButton class="sf-button--text actions__button"
                      >Add to compare</SfButton
                    >
                  </div>

                  <!-- Remove Product from Collection -->

                  <span class="remove-cart" @click="removeHandler(product)"
                    ><i class="las la-times"></i
                  ></span>
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>

          <!-- Empty page if there is no product -->

          <div v-else key="empty-cart" class="empty-cart">
            <SfImage
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
              alt="Empty cart"
              class="empty-cart__image"
              :width="140"
              :height="200"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              description="Looks like you haven’t added any items to the cart yet. Start
                shopping to fill it in."
            />
            <SfButton
              class="sf-button--full-width color-primary empty-cart__button"
              >Start shopping</SfButton
            >
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfOrderSummary,
  SfButton,
  SfCollectedProduct,
  SfProperty,
  SfImage,
} from "@storefront-ui/vue";
export default {
  name: "Cart",
  components: {
    SfOrderSummary,
    SfButton,
    SfCollectedProduct,
    SfProperty,
    SfImage,
  },
  data() {
    return {
      disabled: true,
      products: [
        {
          title: "Product 1",
          id: "CBB1",
          image: "/images/e-gadget1.jpg",
          price: { regular: "30.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "Black" },
          ],
          qty: 1,
        },
        {
          title: "Product 2",
          id: "CBB2",
          image: "/images/e-gadget2.jpg",
          price: { regular: "50.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "Black" },
          ],
          qty: 1,
        },
        {
          title: "Product 3",
          id: "CBB3",
          image: "/images/e-gadget3.jpg",
          price: { regular: "70.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "Black" },
          ],
          qty: 1,
        },
      ],
      shipping: {
        shippingMethod: {
          isOpen: false,
          price: "$9.90",
          delivery: "Delivery from 3 to 7 business days",
          label: "Pickup in the store",
          value: "store",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
      },
    };
  },
  computed: {
    // Get Products
    totalItems() {
      return this.products.reduce(
        (totalItems, product) => totalItems + parseInt(product.qty, 10),
        0
      );
    },
    // Get Orders with shippingMethod & Products for Order Summary
    getOrder() {
      return {
        orderItems: this.products,
        shipping: { ...this.shipping },
      };
    },
  },
  methods: {
    // To handle for remove of product from Collection
    removeHandler(product) {
      const products = [...this.products];
      this.products = products.filter((element) => element.id !== product.id);
    },
    // To increase/decrase the number of products
    handleAction(product) {
      this.orders.orderItems.forEach((item) => {
        if (item.id == product.id) {
          item.qty = product.qty;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#cart {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 var(--spacer-sm);
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0;
}
.detailed-cart {
  &__main {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside {
    box-sizing: border-box;
    width: 100%;
    background: var(--c-light);
    padding: var(--spacer-base) var(--spacer-sm);
  }
  @include for-desktop {
    display: flex;
    &__main {
      flex: 1;
    }
    &__aside {
      flex: 0 0 26.8125rem;
      order: 1;
      margin: 0 0 0 var(--spacer-xl);
      padding: var(--spacer-xl);
    }
  }
}
.collected-product {
  --collected-product-padding: var(--spacer-sm) 0;
  --collected-product-actions-display: flex;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:first-of-type {
    border-top: none;
  }
  &__properties {
    --property-value-font-weight: var(--font-weight--normal);
    margin: var(--spacer-sm) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
  }
  @include for-mobile {
    --collected-product-remove-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    --collected-product-padding: var(--spacer-lg) 0;
  }
}
.actions {
  &__button {
    display: block;
    margin: 0 0 var(--spacer-xs) 0;
    color: var(--c-text);
    &:hover {
      color: var(--c-text-muted);
    }
  }
  &__description {
    font-family: var(--font-family--primary);
    font-size: var(--font-size--sm);
    font-weight: var(--font-weight--light);
    color: var(--c-text-muted);
    position: absolute;
    bottom: 0;
    padding-bottom: var(--spacer-lg);
  }
}
.empty-cart {
  --heading-title-color: var(--c-primary);
  --heading-title-margin: 0 0 var(--spacer-base) 0;
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__image {
    --image-width: 13.1875rem;
    margin: var(--spacer-2xl) 0;
  }
  @include for-desktop {
    &__image {
      --image-width: 22rem;
    }
    &__button {
      --button-width: 20.9375rem;
    }
  }
}
</style>
<!-- CSS Customization in public mode -->
<style>
#order-summary .sf-order-summary__promo-code {
  display: none;
}
.checkout {
  margin-bottom: 10px;
  --button-background: #006be9 !important;
}
.continue-shopping {
  color: #9f9fe3;
}
.cart-item
  .sf-collected-product__main
  .sf-collected-product__details
  .sf-collected-product__title-wraper
  .sf-collected-product__title {
  font-weight: bold;
}
.cart-item
  .sf-collected-product__main
  .sf-collected-product__details
  .sf-price
  .sf-price__regular {
  font-weight: bold;
}
.cart-item .sf-collected-product__remove--text {
  display: none;
}
.remove-cart {
  position: absolute;
  right: 0px;
}
.remove-cart .la-times {
  font-size: 25px !important;
  cursor: pointer;
}
.la-times:hover {
  color: rgb(190 200 211);
}
.cart-item .sf-property__value {
  font-weight: bold;
}
</style>