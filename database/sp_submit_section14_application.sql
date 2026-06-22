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
    v_officename VARCHAR;
    v_officeplace VARCHAR;
    v_petitioner JSON;
    v_land JSON;
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

    SELECT
    officename,
    officeplace
    INTO
        v_officename,
        v_officeplace
    FROM masdistrict
    WHERE statecode = p_case_data->>'statecode'
    AND distcode = p_case_data->>'distcode'
    LIMIT 1;

    -- Insert Case Details
    INSERT INTO tblrevcases
    (
        caseid,
        statecode,
        officeid,
        officename,
        officeplace,
        distcode,
        subdivcode,
        revcirclecode,
        caseyear,
        subject,
        undersection,
        ifcsc
    )
    VALUES
    (
        v_caseid,
        p_case_data->>'statecode',
        p_case_data->>'officeid',
        v_officename,
        v_officeplace,
        p_case_data->>'distcode',
        p_case_data->>'subdivcode',
        p_case_data->>'revcirclecode',
        p_case_data->>'caseyear',
        p_case_data->>'subject',
        p_case_data->>'undersection',
        FALSE
    );


    -----------------------------------------------------------------
    -- Insert Petitioners
    -----------------------------------------------------------------

    FOR v_petitioner IN
        SELECT *
        FROM jsonb_array_elements(p_case_data->'petitioners')
    LOOP

        INSERT INTO tblpetitioner
        (
            caseid,
            petisl,
            petiname,
            petirelation,
            petifh_name,
            petiaddress,
            peticontactno,
            petiemail
        )
        VALUES
        (
            v_caseid,
            (v_petitioner->>'petisl')::INTEGER,
            v_petitioner->>'petiname',
            v_petitioner->>'petirelation',
            v_petitioner->>'petifh_name',
            v_petitioner->>'petiaddress',
            v_petitioner->>'peticontactno',
            v_petitioner->>'petiemail'
        );

    END LOOP;

    -----------------------------------------------------------------
    -- Insert Land Details
    -----------------------------------------------------------------

    FOR v_land IN
        SELECT *
        FROM jsonb_array_elements(p_case_data->'lands')
    LOOP

        INSERT INTO tbllanddetail
        (
            caseid,
            moucode,
            ktsr,
            ptsr,
            area,
            main_class_code,
            sub_class_code
        )
        VALUES
        (
            v_caseid,
            v_land->>'moucode',
            v_land->>'ktsr',
            v_land->>'ptsr',
            (v_land->>'area'),
            v_land->>'main_class_code',
            v_land->>'sub_class_code'
        );

    END LOOP;

    -----------------------------------------------------------------
    -- Insert User Log
    -----------------------------------------------------------------

    INSERT INTO tbluserlog
    (
        caseid,
        taskinfo,
        userid,
        dttask,
        entcomputer
    )
    VALUES
    (
        v_caseid,
        'Section 14 Application Submitted',
        p_case_data->'user'->>'userid',
        NOW(),
        p_case_data->'user'->>'computer'
    );

    o_caseid := v_caseid;

END;
$$;