package in.gov.rccms.section14_api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.gov.rccms.section14_api.dto.SubmitSection14Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class SubmitSection14Service {

        @Autowired
        private JdbcTemplate jdbcTemplate;

        @Autowired
        private ObjectMapper objectMapper;

        public String submitApplication(
                        SubmitSection14Request request) throws Exception {

                String jsonString = objectMapper.writeValueAsString(
                                request.getCaseData());
                System.out.println("APP ID = " + request.getAppId());
                System.out.println("APP KEY = " + request.getAppKey());
                System.out.println("JSON = " + jsonString);

                return jdbcTemplate.execute(
                                (org.springframework.jdbc.core.CallableStatementCreator) con -> {

                                        java.sql.CallableStatement cs = con.prepareCall(
                                                        "CALL sp_submit_section14_application(?, ?, CAST(? AS jsonb), ?)");

                                        cs.setString(
                                                        1,
                                                        request.getAppId());

                                        cs.setString(
                                                        2,
                                                        request.getAppKey());

                                        cs.setString(
                                                        3,
                                                        jsonString);

                                        cs.registerOutParameter(
                                                        4,
                                                        java.sql.Types.VARCHAR);

                                        return cs;
                                },
                                (org.springframework.jdbc.core.CallableStatementCallback<String>) cs -> {

                                        cs.execute();

                                        return cs.getString(4);
                                });
        }
}
