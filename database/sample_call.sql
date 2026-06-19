-- Validate Client

SELECT sp_validate_client(
'rccms_summer_camp',
'd4d6e2c0dd461e873663bb228229d9200cc2a2799a88df817k6e7b95a0992797'
);

------------------------------------------------------------

-- Generate Case ID

SELECT fn_generate_case_id(
'16',
'02',
'2026'
);

------------------------------------------------------------

-- Sample Procedure Call

CALL sp_submit_section14_application
(
'rccms_summer_camp',

'd4d6e2c0dd461e873663bb228229d9200cc2a2799a88df817k6e7b95a0992797',

'{
    "statecode":"16",
    "distcode":"02",
    "caseyear":"2026",
    "subject":"Sample Subject",
    "undersection":"95",
    "petitioners":[],
    "lands":[]
}'::jsonb,

NULL
);