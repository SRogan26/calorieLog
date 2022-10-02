-- use LEFT JOIN to show brand names from brands table on items
SELECT
items.item_id, 
brands.name AS Brand, 
items.name,
items.calories,
items.fat,
items.carbs,
items.protein
FROM items LEFT JOIN brands
ON items.brand_id = brands.brand_id;