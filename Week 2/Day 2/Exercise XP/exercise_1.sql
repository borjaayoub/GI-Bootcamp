SELECT * FROM items ORDER BY items_price ASC;

SELECT * FROM items WHERE items_price >= 80 ORDER BY items_price DESC;

SELECT customers_firstname, customers_lastname FROM customers ORDER BY customers_firstname ASC limit 3;

SELECT customers_lastname FROM customers ORDER BY customers_lastname DESC;
