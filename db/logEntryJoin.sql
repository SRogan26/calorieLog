-- use LEFT JOIN to show brand names from brands table on items
SELECT
l.entry_id,
l.time_log, 
b.name AS Brand, 
i.name AS Item,
i.calories,
i.fat,
i.carbs,
i.protein
FROM log_entries l LEFT JOIN items i
ON l.item_id = i.item_id
LEFT JOIN brands b
ON i.brand_id = b.brand_id
ORDER BY l.time_log;