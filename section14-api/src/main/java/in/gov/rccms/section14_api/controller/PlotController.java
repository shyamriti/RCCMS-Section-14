package in.gov.rccms.section14_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.gov.rccms.section14_api.service.PlotService;

@RestController
@RequestMapping("/api")
public class PlotController {

    @Autowired
    private PlotService plotService;

    @GetMapping("/plots")
    public String getPlots(
            @RequestParam("lgd_village_code") String lgdVillageCode,
            @RequestParam("khatian_no") String khatianNo)
            throws Exception {

        return plotService.getPlots(
                lgdVillageCode,
                khatianNo);
    }
}