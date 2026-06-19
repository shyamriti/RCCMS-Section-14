package in.gov.rccms.section14_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.gov.rccms.section14_api.service.SubdivisionService;

@RestController
@RequestMapping("/api")
public class SubdivisionController {

    @Autowired
    private SubdivisionService subdivisionService;

    @GetMapping("/subdivisions")
    public String getSubdivisions(
            @RequestParam String appId,
            @RequestParam String distcode)
            throws Exception {

        return subdivisionService.getSubdivisions(
                appId,
                distcode);
    }
}