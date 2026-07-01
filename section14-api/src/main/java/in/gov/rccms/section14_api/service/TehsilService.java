package in.gov.rccms.section14_api.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import in.gov.rccms.section14_api.entity.TblClientAuth;

@Service
public class TehsilService {

        private static final Logger log = LoggerFactory.getLogger(
                        TehsilService.class);

        @Autowired
        private ClientAuthService clientAuthService;

        @Autowired
        private HmacValidationService hmacValidationService;

        public String getTehsils(
                        String appId,
                        String distcode,
                        String subdivcode,
                        String revcirclecode)
                        throws Exception {

                log.info("Tehsil API Called");

                Optional<TblClientAuth> client = clientAuthService.getClientByAppId(
                                appId);

                if (client.isEmpty()) {

                        throw new RuntimeException(
                                        "Invalid App ID");
                }

                String appKey = client.get().getAppKey();

                String message = distcode
                                + subdivcode
                                + revcirclecode
                                + appId;

                String hmac = hmacValidationService.generateRccmsHmac(
                                message,
                                appKey);

                log.info("MESSAGE : {}", message);
                log.info("HMAC : {}", hmac);

                String baseUrl = "https://rccms.tripura.gov.in/uat-rccmsapis/webresources/api/v2/gettehsils";

                String url = baseUrl
                                + "?app_id=" + appId
                                + "&client_hmac=" + hmac
                                + "&distcode=" + distcode
                                + "&subdivcode=" + subdivcode
                                + "&revcirclecode=" + revcirclecode;

                log.info("URL : {}", url);

                RestTemplate restTemplate = new RestTemplate();

                String response = restTemplate.getForObject(
                                url,
                                String.class);

                if (response == null ||
                                response.isBlank()) {

                        throw new RuntimeException(
                                        "Empty response received from RCCMS API");
                }

                log.info("Tehsil API Success");

                return response;
        }
}
