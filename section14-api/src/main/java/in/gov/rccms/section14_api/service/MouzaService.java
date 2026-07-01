package in.gov.rccms.section14_api.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import in.gov.rccms.section14_api.entity.TblClientAuth;

@Service
public class MouzaService {

    private static final Logger log =
            LoggerFactory.getLogger(
                    MouzaService.class);

    @Autowired
    private ClientAuthService clientAuthService;

    @Autowired
    private HmacValidationService hmacValidationService;

    public String getMouzas(
            String appId,
            String distcode,
            String subdivcode,
            String revcirclecode,
            String tehsilcode)
            throws Exception {

        log.info("Mouza API Called");

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
                + revcirclecode
                + tehsilcode
                + appId;

        String hmac =
                hmacValidationService.generateHmac(
                        message,
                        appKey);

        log.info("MESSAGE : {}", message);
        log.info("HMAC : {}", hmac);

        String baseUrl =
                "https://rccms.tripura.gov.in/uat-rccmsapis/webresources/api/v2/getmouzas";

        String url =
                baseUrl
                + "?app_id=" + appId
                + "&client_hmac=" + hmac
                + "&distcode=" + distcode
                + "&subdivcode=" + subdivcode
                + "&revcirclecode=" + revcirclecode
                + "&tehsilcode=" + tehsilcode;

        log.info("URL : {}", url);

        RestTemplate restTemplate =
                new RestTemplate();

        long start = System.currentTimeMillis();

String response =
        restTemplate.getForObject(
                url,
                String.class);

long end = System.currentTimeMillis();

System.out.println("External API Time: " + (end - start) + " ms");

        if (response == null ||
                response.isBlank()) {

            throw new RuntimeException(
                    "Empty response received from RCCMS API");
        }

        log.info("Mouza API Success");

        return response;
    }
}