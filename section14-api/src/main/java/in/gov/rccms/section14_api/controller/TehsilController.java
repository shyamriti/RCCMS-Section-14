package in.gov.rccms.section14_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.gov.rccms.section14_api.service.TehsilService;

@RestController
@RequestMapping("/api")
public class TehsilController {

    @Autowired
    private TehsilService tehsilService;

    @GetMapping("/tehsils")
    public String getTehsils(
            @RequestParam String appId,
            @RequestParam String distcode,
            @RequestParam String subdivcode,
            @RequestParam String revcirclecode)
            throws Exception {

        return tehsilService.getTehsils(
                appId,
                distcode,
                subdivcode,
                revcirclecode);
    }
}
