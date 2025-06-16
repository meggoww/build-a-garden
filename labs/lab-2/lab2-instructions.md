# Lab 1: Back-end

The goal of this lab exercise is to practice what you've learned about Postgres, Node.js, and Express.

## Objective: Add a feature to the website for product discounts.

It should:

1. Display the discount percentage for each product in the product page as well as the final price after applying the discount.
2. When a user adds a product to the cart, it should apply the discount if available.

### Milestone 1. Add a new table to the buildagarden database for storing discount data on products

Table Name: `discounts`
Columns:

- `discount_id` (Primary Key, Auto Increment)
- `product_id` (Foreign Key referencing `products.product_id`)
- `discount_percentage` (Float)

**Hint: You can use the queries in the [db_setup.md](../../docs/db-setup.md) file as a reference for creating the table.**

### Milestone 2. Add a new route to server.js for fetching discount data

**Hint: You can use the existing 'api/products' route in `server.js` as a reference for creating the new route.**

### Milestone 3. Test your changes

1. Add the following items to your cart:

   - Sunflower - Quantity 1
   - Rose - Quantity 2
   - Oak Tree - Quanitity 1

   Navigate to the cart page and it should look something like this:
   ![alt text](cart-sample.png)

2. Remove the Sunflower item from the cart.

   The cart should now look like this:
   ![alt text](cart-delete-sample.png)
