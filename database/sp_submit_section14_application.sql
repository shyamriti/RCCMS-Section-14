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
    v_slno INTEGER;
    v_opponent_name VARCHAR;
    v_caseid VARCHAR;
    v_officename VARCHAR;
    v_officeplace VARCHAR;
    v_petitioner JSON;
    v_land JSON;
    v_petitioner_name VARCHAR;
BEGIN

    -- Validate Client
    IF NOT sp_validate_client(p_app_id, p_app_key) THEN
        RAISE EXCEPTION 'Invalid Client Authentication';
    END IF;

    SELECT COALESCE(MAX(slno),0) + 1
    INTO v_slno
    FROM tblrevcases
    WHERE statecode = '16'
    AND distcode = p_case_data->>'distcode'
    AND caseyear = EXTRACT(YEAR FROM CURRENT_DATE)::VARCHAR;

    -- Generate Case ID
    v_caseid := fn_generate_case_id(
        p_case_data->>'statecode',
        p_case_data->>'distcode',
        EXTRACT(YEAR FROM CURRENT_DATE)::VARCHAR
        -- p_case_data->>'caseyear'
    );

    -- v_caseid := fn_generate_case_id(
    -- '16',
    -- '02',
    -- '2026'
    -- );

    -- RAISE NOTICE 'state=% dist=% year=%',
    -- p_case_data->>'statecode',
    -- p_case_data->>'distcode',
    -- p_case_data->>'caseyear';

    -- RAISE NOTICE 'Generated Case ID = %', v_caseid;

    SELECT
        officename,
        officeplace
    INTO
        v_officename,
        v_officeplace
    FROM massubdivision
    WHERE officeid = p_case_data->>'officeid'
    LIMIT 1;

    v_petitioner_name :=
    (
        p_case_data->'petitioners'->0->>'petiname'
    );

    v_opponent_name :=
    COALESCE(
        p_case_data->>'opponents',
        'The State Of Tripura'
    );

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
        tehsilcode,
        moucode,
        khatiannos,
        plotnos,
        petitioners,
        opponents,
        landamount,
        applicationdt,
        appldocsl,
        slno,
        caseyear,
        subject,
        undersection,
        casestatus,
        ifonline,
        ifcsc
    )
    VALUES
    (
        v_caseid,
        '16',
        p_case_data->>'officeid',
        v_officename,
        v_officeplace,
        p_case_data->>'distcode',
        p_case_data->>'subdivcode',
        p_case_data->>'revcirclecode',

        p_case_data->>'tehsilcode',
        p_case_data->>'moucode',

        p_case_data->>'khatiannos',
        p_case_data->>'plotnos',

        v_petitioner_name,

        v_opponent_name,

        p_case_data->>'landamount',

        CURRENT_DATE,

        COALESCE((p_case_data->>'appldocsl')::INTEGER,0),

        v_slno,

        EXTRACT(YEAR FROM CURRENT_DATE)::VARCHAR,

        p_case_data->>'subject',

        '14(1)',

        '1',

        TRUE,

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