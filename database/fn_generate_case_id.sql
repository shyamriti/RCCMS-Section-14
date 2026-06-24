CREATE OR REPLACE FUNCTION fn_generate_case_id
(
    p_statecode VARCHAR,
    p_distcode VARCHAR,
    p_caseyear VARCHAR
)
RETURNS VARCHAR
LANGUAGE plpgsql
AS
$$
DECLARE
    v_last_caseid VARCHAR;
    v_serial INTEGER;
    v_caseid VARCHAR;
BEGIN

    SELECT slno
    INTO v_last_caseid
    FROM tblrevcases
    WHERE statecode = p_statecode
      AND distcode = p_distcode
      AND caseyear = p_caseyear
    ORDER BY slno::INTEGER DESC
    LIMIT 1;

    IF v_last_caseid IS NULL THEN
        v_serial := 1;
    ELSE
        v_serial := v_last_caseid::INTEGER + 1;
    END IF;

    v_caseid :=
        p_statecode || '-' ||
        p_distcode || '-' ||
        p_caseyear || '-' ||
        v_serial;

    RETURN v_caseid;

END;
$$;
