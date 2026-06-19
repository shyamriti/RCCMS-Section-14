package in.gov.rccms.section14_api.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import in.gov.rccms.section14_api.entity.TblClientAuth;

@Service
public class RevenueCircleService {

    private static final Logger log =
            LoggerFactory.getLogger(
                    RevenueCircleService.class);

    @Autowired
    private ClientAuthService clientAuthService;

    @Autowired
    private HmacValidationService hmacValidationService;

    public String getRevenueCircles(
            String appId,
            String distcode,
            String subdivcode)
            throws Exception {

        log.info("Revenue Circle API Called");

        Optional<TblClientAuth> client =
                clientAuthService.getClientByAppId(
                        appId);

        if (client.isEmpty()) {

            throw new RuntimeException(
                    "Invalid App ID");
        }

        String appKey =
                client.get().getAppKey();

        String message =
                distcode
                + subdivcode
                + appId;

        String hmac =
                hmacValidationService.generateHmac(
                        message,
                        appKey);

        log.info("MESSAGE : {}", message);
        log.info("HMAC : {}", hmac);

        String baseUrl =
                "https://rccms.tripura.gov.in/uat-rccmsapis/webresources/api/v2/getrevcircle";

        String url =
                baseUrl
                + "?app_id=" + appId
                + "&client_hmac=" + hmac
                + "&distcode=" + distcode
                + "&subdivcode=" + subdivcode;

        log.info("URL : {}", url);

        RestTemplate restTemplate =
                new RestTemplate();

        String response =
                restTemplate.getForObject(
                        url,
                        String.class);

        if (response == null ||
                response.isBlank()) {

            throw new RuntimeException(
                    "Empty response received from RCCMS API");
        }

        log.info("Revenue Circle API Success");

        return response;
    }
}
