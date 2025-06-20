import {defineStore} from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: new Map(),
  }),
  getters: {
    totalPrice: (state) => {
      let total = 0;
      state.items.forEach((item, key) => {
        total += item.price * item.quantity;
      });
      return total;
    },
  },
  actions: {
    addItem(item) {
      const existingItem = this.items.get(item.product_id);
      if(existingItem !== undefined){
        existingItem.quantity++;
      } else {
          this.items.set(
            item.product_id,
            {
              ...item,
              quantity: 1
            }
          )
      }

    },
  },
});
