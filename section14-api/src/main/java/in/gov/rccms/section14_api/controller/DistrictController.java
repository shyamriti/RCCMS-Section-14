package in.gov.rccms.section14_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.gov.rccms.section14_api.service.DistrictService;

@RestController
@RequestMapping("/api")
public class DistrictController {

    @Autowired
    private DistrictService districtService;

    @GetMapping("/districts")
    public String getDistricts() throws Exception {

        return districtService.getDistricts();
    }
}
