package in.gov.rccms.section14_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.gov.rccms.section14_api.service.MouzaService;

@RestController
@RequestMapping("/api")
public class MouzaController {

    @Autowired
    private MouzaService mouzaService;

    @GetMapping("/mouzas")
    public String getMouzas(
            @RequestParam String appId,
            @RequestParam String distcode,
            @RequestParam String subdivcode,
            @RequestParam String revcirclecode,
            @RequestParam String tehsilcode)
            throws Exception {

        return mouzaService.getMouzas(
                appId,
                distcode,
                subdivcode,
                revcirclecode,
                tehsilcode);
    }
}
