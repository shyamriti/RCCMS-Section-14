package in.gov.rccms.section14_api.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PlotService {

    private static final Logger log = LoggerFactory.getLogger(PlotService.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public String getPlots(
            String lgdVillageCode,
            String khatianNo)
            throws Exception {

        log.info("Plot API Called");

        String sql = """
                SELECT
                    plot_no,
                    plot_area,
                    area_unit,
                    land_mainclass_code,
                    land_mainclass_eng,
                    land_subclass_code,
                    land_subclass_eng
                FROM masplotlist
                WHERE lgd_village_code = ?
                AND khatian_no = ?
                ORDER BY plot_no
                """;

        List<Map<String, Object>> response = jdbcTemplate.queryForList(
                sql,
                lgdVillageCode,
                khatianNo);

        log.info("Plot API returned {} record(s)", response.size());

        return objectMapper.writeValueAsString(response);
    }
}