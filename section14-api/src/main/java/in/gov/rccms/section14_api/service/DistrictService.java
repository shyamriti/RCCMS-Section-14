package in.gov.rccms.section14_api.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import in.gov.rccms.section14_api.entity.TblClientAuth;

@Service
public class DistrictService {

        private static final Logger log =
        LoggerFactory.getLogger(DistrictService.class);

    @Autowired
    private ClientAuthService clientAuthService;

    @Autowired
    private HmacValidationService hmacValidationService;

    public String getDistricts(String appId) throws Exception {
                
        log.info("District API Called");


        Optional<TblClientAuth> client =
                clientAuthService.getClientByAppId(appId);

        if (client.isEmpty()) {
            throw new RuntimeException( "App ID not found in tblclientauth");
        }

        String appKey =
                client.get().getAppKey();

        String officeLevel = "02";

        String message =
                officeLevel + appId;

        String hmac =
                hmacValidationService.generateHmac(
                        message,
                        appKey);

        
        log.info("MESSAGE : {}", message);
           log.info("HMAC : {}", hmac);


        String baseUrl =
                "https://rccms.tripura.gov.in/uat-rccmsapis/webresources/api/v2/getdistrict";

        String url =
                baseUrl
                + "?app_id=" + appId
                + "&client_hmac=" + hmac
                + "&officelevel=" + officeLevel;

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

if(response == null || response.isBlank())
{
    log.error("Empty response received from RCCMS API");
    throw new RuntimeException(
            "Invalid RCCMS response");
}

log.info("District API response received successfully");

return response;
    }
}  

