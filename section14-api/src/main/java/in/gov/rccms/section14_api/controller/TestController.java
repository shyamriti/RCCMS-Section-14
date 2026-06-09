package in.gov.rccms.section14_api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import in.gov.rccms.section14_api.entity.TblClientAuth;
import in.gov.rccms.section14_api.service.ClientAuthService;

@RestController
public class TestController {

    @Autowired
    private ClientAuthService service;

    @GetMapping("/test-client")
    public Object testClient() {

        Optional<TblClientAuth> client = service.getClientByAppId("rccms_summer_camp");

        if (client.isPresent()) {
            return client.get();
        }

        return "Client Not Found";
    }
}