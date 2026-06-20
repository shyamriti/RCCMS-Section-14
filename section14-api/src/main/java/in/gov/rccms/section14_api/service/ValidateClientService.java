package in.gov.rccms.section14_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class ValidateClientService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Boolean validateClient(
            String appId,
            String appKey) {

        String sql =
                "SELECT sp_validate_client(?, ?)";

        return jdbcTemplate.queryForObject(
                sql,
                Boolean.class,
                appId,
                appKey);
    }
}
