CREATE OR REPLACE FUNCTION sp_validate_client
(
    p_app_id  VARCHAR,
    p_app_key TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS
$$
DECLARE
    v_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO v_count
    FROM tblclientauth
    WHERE app_id = p_app_id
      AND app_key = p_app_key;

    IF v_count > 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;

END;
$$;