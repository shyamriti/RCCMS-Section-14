package in.gov.rccms.section14_api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.gov.rccms.section14_api.dto.HmacValidationRequest;
import in.gov.rccms.section14_api.dto.HmacValidationResponse;
import in.gov.rccms.section14_api.entity.TblClientAuth;
import in.gov.rccms.section14_api.service.ClientAuthService;
import in.gov.rccms.section14_api.service.HmacValidationService;

@RestController
@RequestMapping("/api")
public class HmacValidationController {

    @Autowired
    private ClientAuthService clientAuthService;

    @Autowired
    private HmacValidationService hmacValidationService;

    @PostMapping("/validate-hmac")
    public HmacValidationResponse validateHmac(
            @RequestBody HmacValidationRequest request) {

        try {

            // Step 1: Check App ID

            Optional<TblClientAuth> client =
                    clientAuthService.getClientByAppId(
                            request.getAppId());

            if (client.isEmpty()) {

                return new HmacValidationResponse(
                        false,
                        "Invalid App ID");
            }

            // Step 2: Rebuild Message

            String message =
                    request.getTransactionId()
                    + "|"
                    + request.getUserId()
                    + "|"
                    + request.getCallbackUrl()
                    + "|"
                    + request.getUndersection()
                    + "|"
                    + request.getAppId();

            // Step 3: Generate HMAC Using DB Key

            String generatedHmac =
                    hmacValidationService.generateHmac(
                            message,
                            client.get().getAppKey());
System.out.println("================================");
System.out.println("MESSAGE: " + message);
System.out.println("GENERATED HMAC: " + generatedHmac);
System.out.println("RECEIVED HMAC: " + request.getHmac());
System.out.println("================================");
            // Step 4: Compare

            boolean valid =
                    generatedHmac.equals(
                            request.getHmac());

            return new HmacValidationResponse(
                    valid,
                    valid
                            ? "HMAC Valid"
                            : "HMAC Invalid");

        } catch (Exception ex) {

    return new HmacValidationResponse(
            false,
            ex.getMessage());
}
    }
}