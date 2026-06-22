package in.gov.rccms.section14_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.gov.rccms.section14_api.service.RevenueCircleService;

@RestController
@RequestMapping("/api")
public class RevenueCircleController {

    @Autowired
    private RevenueCircleService revenueCircleService;

    @GetMapping("/revenue-circles")
    public String getRevenueCircles(
            @RequestParam String appId,
            @RequestParam String distcode,
            @RequestParam String subdivcode)
            throws Exception {

        return revenueCircleService.getRevenueCircles(
                appId,
                distcode,
                subdivcode);
    }
}
