package in.gov.rccms.section14_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.gov.rccms.section14_api.service.ValidateClientService;

@RestController
public class ValidateClientController {

    @Autowired
    private ValidateClientService service;

    @GetMapping("/api/validate-client")
    public Boolean validateClient(
            @RequestParam String appId,
            @RequestParam String appKey) {

        return service.validateClient(
                appId,
                appKey);
    }
}
