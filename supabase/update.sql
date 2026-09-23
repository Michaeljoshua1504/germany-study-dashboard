-- Test update: touch updated_at to verify pipeline works
UPDATE page_sections 
SET updated_at = NOW() 
WHERE section_key = 'visa';
