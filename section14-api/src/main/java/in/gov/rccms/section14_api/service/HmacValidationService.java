package in.gov.rccms.section14_api.service;

import java.nio.charset.StandardCharsets;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

@Service
public class HmacValidationService {

    public String generateHmac(
            String message,
            String secretKey) {

        try {

            Mac sha256Hmac = Mac.getInstance("HmacSHA256");

            SecretKeySpec secret = new SecretKeySpec(
                    secretKey.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256");

            sha256Hmac.init(secret);

            byte[] signedBytes = sha256Hmac.doFinal(
                    message.getBytes(StandardCharsets.UTF_8));

            String generatedHmac = Base64
                    .encodeBase64String(signedBytes)
                    .trim();

            generatedHmac = generatedHmac
                    .replaceAll("%(?![0-9a-fA-F]{2})", "%25")
                    .replaceAll("\\+", "");

            return generatedHmac;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to calculate HMAC signature", e);
        }
    }
}