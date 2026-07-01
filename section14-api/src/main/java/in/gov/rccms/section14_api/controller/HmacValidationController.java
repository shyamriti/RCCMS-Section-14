package in.gov.rccms.section14_api.controller;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
        private static final Logger logger = LoggerFactory.getLogger(HmacValidationController.class);

        @Autowired
        private ClientAuthService clientAuthService;

        @Autowired
        private HmacValidationService hmacValidationService;

        @PostMapping("/validate-hmac")
        public HmacValidationResponse validateHmac(
                        @RequestBody HmacValidationRequest request) {
                logger.info(
                                "HMAC validation request received. transactionId={}, appId={}",
                                request.getTransactionId(),
                                request.getAppId());

                try {

                        // Step 1: Check App ID

                        Optional<TblClientAuth> client = clientAuthService.getClientByAppId(
                                        request.getAppId());

                        if (client.isEmpty()) {
                                logger.warn(
                                                "Invalid App ID received: {}",
                                                request.getAppId());

                                return new HmacValidationResponse(
                                                false,
                                                "Invalid App ID");
                        }

                        // Step 2: Rebuild Message

                        String message = request.getTransactionId()
                                        + "|"
                                        + request.getUserId()
                                        + "|"
                                        + request.getCallbackUrl()
                                        + "|"
                                        + request.getUndersection()
                                        + "|"
                                        + request.getAppId();

                        // Step 3: Generate HMAC Using DB Key

                        String generatedHmac = hmacValidationService.generateInternalHmac(
                                        message,
                                        client.get().getAppKey());
                        System.out.println("================================");
                        System.out.println("MESSAGE: " + message);
                        System.out.println("GENERATED HMAC: " + generatedHmac);
                        System.out.println("RECEIVED HMAC: " + request.getHmac());
                        System.out.println("================================");
                        // Step 4: Compare

                        boolean valid = generatedHmac.equals(
                                        request.getHmac());
                        if (valid) {

                                logger.info(
                                                "HMAC validation successful. transactionId={}",
                                                request.getTransactionId());

                        } else {

                                logger.warn(
                                                "HMAC validation failed. transactionId={}",
                                                request.getTransactionId());

                        }

                        return new HmacValidationResponse(
                                        valid,
                                        valid
                                                        ? "HMAC Valid"
                                                        : "HMAC Invalid");

                } catch (Exception ex) {

                        logger.error(
                                        "Exception occurred during HMAC validation",
                                        ex);

                        return new HmacValidationResponse(
                                        false,
                                        ex.getMessage());
                }
        }
}