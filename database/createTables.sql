/* -----------------------------------------------------------------
Script to create the CMS People Finder database
*** Note this will delete all tables and therefore delete all data
-------------------------------------------------------------------*/

-- Assume database has been created and we are logged into the 
--  database as user pf_computer_access

-- Drop tables in reverse order of creation
DROP TABLE IF EXISTS high_scores;
DROP TABLE IF EXISTS login;



