# Database Procedure / Function Signatures

## 1. Function: `fn_generate_case_id`

### Signature

```sql
fn_generate_case_id
(
    p_statecode VARCHAR,
    p_distcode VARCHAR,
    p_caseyear VARCHAR
)
RETURNS VARCHAR
```

### Input Parameters

| Parameter   | Data Type | Description   |
| ----------- | --------- | ------------- |
| p_statecode | VARCHAR   | State Code    |
| p_distcode  | VARCHAR   | District Code |
| p_caseyear  | VARCHAR   | Case Year     |

### Return Type

| Type    | Description                                         |
| ------- | --------------------------------------------------- |
| VARCHAR | Generated RCCMS Case ID (Example: `16-02-2026-190`) |

---

# 2. Function: `sp_validate_client`

### Signature

```sql
sp_validate_client
(
    p_app_id VARCHAR,
    p_app_key TEXT
)
RETURNS BOOLEAN
```

### Input Parameters

| Parameter | Data Type | Description               |
| --------- | --------- | ------------------------- |
| p_app_id  | VARCHAR   | Client Application ID     |
| p_app_key | TEXT      | Client Authentication Key |

### Return Type

| Type    | Description                                      |
| ------- | ------------------------------------------------ |
| BOOLEAN | TRUE if authentication succeeds, otherwise FALSE |

---

# 3. Procedure: `sp_submit_section14_application`

### Signature

```sql
CALL sp_submit_section14_application
(
    p_app_id VARCHAR,
    p_app_key TEXT,
    p_case_data JSONB,
    OUT o_caseid VARCHAR
);
```

### Input Parameters

| Parameter   | Data Type | Description                    |
| ----------- | --------- | ------------------------------ |
| p_app_id    | VARCHAR   | Client Application ID          |
| p_app_key   | TEXT      | Client Authentication Key      |
| p_case_data | JSONB     | Section-14 application payload |

### Output Parameter

| Parameter | Data Type | Description             |
| --------- | --------- | ----------------------- |
| o_caseid  | VARCHAR   | Generated RCCMS Case ID |

---

# Sample JSON Request (`p_case_data`)

```json
{
  "statecode": "16",
  "distcode": "02",
  "officeid": "0202",
  "subdivcode": "01",
  "revcirclecode": "03",
  "caseyear": "2026",
  "subject": "Test Section 14 Application",
  "undersection": "95",

  "petitioners": [
    {
      "petisl": 1,
      "petiname": "Test User",
      "petirelation": "S/O",
      "petifh_name": "Father Name",
      "petiaddress": "Agartala",
      "peticontactno": "9876543210",
      "petiemail": "test@example.com"
    }
  ],

  "lands": [
    {
      "moucode": "50132",
      "ktsr": "206",
      "ptsr": "789",
      "area": "0.070",
      "main_class_code": "01",
      "sub_class_code": "03"
    }
  ],

  "user": {
    "userid": "admin",
    "computer": "127.0.0.1"
  }
}
```

### Expected Response

```text
o_caseid = 16-02-2026-190
```
