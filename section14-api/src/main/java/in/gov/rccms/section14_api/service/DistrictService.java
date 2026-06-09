package in.gov.rccms.section14_api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import in.gov.rccms.section14_api.entity.TblClientAuth;

@Service
public class DistrictService {

    @Autowired
    private ClientAuthService clientAuthService;

    @Autowired
    private HmacValidationService hmacValidationService;

    public String getDistricts() throws Exception {

        String appId = "rccms_summer_camp";

        Optional<TblClientAuth> client =
                clientAuthService.getClientByAppId(appId);

        if (client.isEmpty()) {
            return "App ID not found in tblclientauth";
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

        System.out.println("MESSAGE : " + message);
        System.out.println("HMAC : " + hmac);

        String baseUrl =
                "https://rccms.tripura.gov.in/uat-rccmsapis/webresources/api/v2/getdistrict";

        String url =
                baseUrl
                + "?app_id=" + appId
                + "&client_hmac=" + hmac
                + "&officelevel=" + officeLevel;

        System.out.println("URL : " + url);

        RestTemplate restTemplate =
                new RestTemplate();

        String response =
                restTemplate.getForObject(
                        url,
                        String.class);

        return response;
    }
}  

