const {
  useCategoryFactory,
  useCartFactory,
  useContentFactory,
} = require("@vue-storefront/core");

const categoryMethods = {
  categorySearch: async () =>
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve([
            {
              id: 1,
              name: "Accessories",
              slug: "accessories",
              items: [],
            },
            {
              id: 2,
              name: "Brakes",
              slug: "brakes",
              items: [],
            },
            {
              id: 3,
              name: "Tools",
              slug: "tools",
              items: [],
            },
          ]),
        800
      );
    }),
};

const cartMethods = {
  load: async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 800);
    }),
};

const contentMethods = {
  search: async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          heroes: [
            {
              title: "Colorful summer dresses are already in store",
              subtitle: "SUMMER COLLECTION 2021",
              buttonText: "Learn more",
              background: "#eceff1",
              image: {
                mobile:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_328x224.jpg",
                desktop:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_1240x400.jpg",
              },
              link: "/c/women/women-clothing-shirts",
            },
            {
              title: "Colorful summer dresses are already in store",
              subtitle: "SUMMER COLLECTION 2021",
              buttonText: "Learn more",
              background: "#fce4ec",
              image: {
                mobile:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerH_328x224.jpg",
                desktop:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerH_1240x400.jpg",
              },
              link: "/c/women/women-clothing-dresses",
            },
            {
              title: "Colorful summer dresses are already in store",
              subtitle: "SUMMER COLLECTION 2021",
              buttonText: "Learn more",
              background: "#efebe9",
              image: {
                mobile:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerA_328x224.jpg",
                desktop:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerA_1240x400.jpg",
              },
              link: "/c/women/women-shoes-sandals",
              className:
                "sf-hero-item--position-bg-top-left sf-hero-item--align-right",
            },
          ],
          banners: [
            {
              slot: "banner-A",
              subtitle: "Dresses",
              title: "Cocktail & Party",
              description:
                "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
              buttonText: "Shop now",
              image: {
                mobile:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_328x343.jpg",
                desktop:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerF_332x840.jpg",
              },
              class: "sf-banner--slim desktop-only",
              link: "/c/women/women-clothing-skirts",
            },
            {
              slot: "banner-B",
              subtitle: "Dresses",
              title: "Linen Dresses",
              description:
                "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
              buttonText: "Shop now",
              image: {
                mobile:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerE_328x343.jpg",
                desktop:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerE_496x840.jpg",
              },
              class: "sf-banner--slim banner-central desktop-only",
              link: "/c/women/women-clothing-dresses",
            },
            {
              slot: "banner-C",
              subtitle: "T-Shirts",
              title: "The Office Life",
              image: {
                mobile:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerC_328x343.jpg",
                desktop:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerC_332x400.jpg",
              },
              class: "sf-banner--slim banner__tshirt",
              link: "/c/women/women-clothing-shirts",
            },
            {
              slot: "banner-D",
              subtitle: "Summer Sandals",
              title: "Eco Sandals",
              image: {
                mobile:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerG_328x343.jpg",
                desktop:
                  "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerG_332x400.jpg",
              },
              class: "sf-banner--slim",
              link: "/c/women/women-shoes-sandals",
            },
          ],
        });
      }, 800);
    }),
};

module.exports = {
  useCategory: useCategoryFactory(categoryMethods),
  useCart: useCartFactory(cartMethods),
  useContent: useContentFactory(contentMethods),
};
