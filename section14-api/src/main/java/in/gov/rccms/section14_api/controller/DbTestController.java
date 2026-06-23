package in.gov.rccms.section14_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DbTestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/api/db-test")
    public String testDb() {
        return jdbcTemplate.queryForObject(
                "select current_database()",
                String.class);
    }
}
