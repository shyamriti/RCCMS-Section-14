package in.gov.rccms.section14_api.service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

@Service
public class HmacValidationService {

    public String generateHmac(
            String message,
            String secretKey) throws Exception {

        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");

        SecretKeySpec secret_key = new SecretKeySpec(
                secretKey.getBytes(StandardCharsets.UTF_8),
                "HmacSHA256");

        sha256_HMAC.init(secret_key);

        String generatedHmac = Base64.getEncoder().encodeToString(
                sha256_HMAC.doFinal(
                        message.getBytes(StandardCharsets.UTF_8)));

        generatedHmac = generatedHmac
                .replaceAll("%(?![0-9a-fA-F]{2})", "%25")
                .replaceAll("\\+", "");

        return generatedHmac;
    }
}