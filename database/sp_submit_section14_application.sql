CREATE OR REPLACE PROCEDURE sp_submit_section14_application
(
    p_app_id      VARCHAR,
    p_app_key     TEXT,
    p_case_data   JSONB,
    OUT o_caseid  VARCHAR
)
LANGUAGE plpgsql
AS
$$
DECLARE
    v_caseid VARCHAR;
    v_petitioner JSONB;
    v_land JSONB;
BEGIN

    -- Validate Client
    IF NOT sp_validate_client(p_app_id, p_app_key) THEN
        RAISE EXCEPTION 'Invalid Client Authentication';
    END IF;

    -- Generate Case ID
    v_caseid := fn_generate_case_id(
        p_case_data->>'statecode',
        p_case_data->>'distcode',
        p_case_data->>'caseyear'
    );

    -- Insert Case Details
    INSERT INTO tblrevcases
    (
        caseid,
        statecode,
        distcode,
        caseyear,
        subject,
        undersection
    )
    VALUES
    (
        v_caseid,
        p_case_data->>'statecode',
        p_case_data->>'distcode',
        p_case_data->>'caseyear',
        p_case_data->>'subject',
        p_case_data->>'undersection'
    );

    -----------------------------------------------------------------
    -- Insert Petitioners
    -----------------------------------------------------------------

    -- FOR v_petitioner IN
    --     SELECT * FROM jsonb_array_elements(p_case_data->'petitioners')
    -- LOOP
    --     INSERT INTO tblpetitioner (...);
    -- END LOOP;

    -----------------------------------------------------------------
    -- Insert Land Details
    -----------------------------------------------------------------

    -- FOR v_land IN
    --     SELECT * FROM jsonb_array_elements(p_case_data->'lands')
    -- LOOP
    --     INSERT INTO tbllanddetail (...);
    -- END LOOP;

    -----------------------------------------------------------------
    -- Insert User Log
    -----------------------------------------------------------------

    -- INSERT INTO tbluserlog (...);

    o_caseid := v_caseid;

END;
$$;