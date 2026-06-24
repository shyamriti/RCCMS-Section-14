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
    "officeid":"040203",
    "subdivcode":"03",
    "revcirclecode":"01",

    "tehsilcode":"01",
    "moucode":"20125",

    "khatiannos":"777",
    "plotnos":"1780",

    "landamount":"0.070",

    "appldocsl":"1",

    "subject":"Please Correction Of Plot Records",

    "opponents":"The State Of Tripura",

    "petitioners":[
        {
            "petisl":1,
            "petiname":"Sri Chitta Ranjan Paul",
            "petirelation":"S/O",
            "petifh_name":"Father Name",
            "petiaddress":"Agartala",
            "peticontactno":"9876543210",
            "petiemail":"test@example.com"
        }
    ],

    "lands":[
        {
            "moucode":"20125",
            "ktsr":"777",
            "ptsr":"1780",
            "area":"0.070",
            "main_class_code":"01",
            "sub_class_code":"03"
        }
    ],

    "user":{
        "userid":"admin",
        "computer":"127.0.0.1"
    }
}'::jsonb,

NULL
);