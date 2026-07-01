package in.gov.rccms.section14_api.service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

@Service
public class HmacValidationService {

        /**
         * Common HMAC-SHA256 generator.
         */
        private String generateBaseHmac(
                        String message,
                        String secretKey) throws Exception {

                Mac sha256_HMAC = Mac.getInstance("HmacSHA256");

                SecretKeySpec secret_key = new SecretKeySpec(
                                secretKey.getBytes(StandardCharsets.UTF_8),
                                "HmacSHA256");

                sha256_HMAC.init(secret_key);

                return Base64.getEncoder().encodeToString(
                                sha256_HMAC.doFinal(
                                                message.getBytes(StandardCharsets.UTF_8)));
        }

        /**
         * Used for frontend ↔ backend validation.
         */
        public String generateInternalHmac(
                        String message,
                        String secretKey) throws Exception {

                String generatedHmac = generateBaseHmac(message, secretKey);

                generatedHmac = generatedHmac
                                .replaceAll("%(?![0-9a-fA-F]{2})", "%25")
                                .replace("+", "");

                return generatedHmac;
        }

        /**
         * Used for RCCMS API authentication.
         */
        public String generateRccmsHmac(
                        String message,
                        String secretKey) throws Exception {

                String generatedHmac = generateBaseHmac(message, secretKey);

                generatedHmac = generatedHmac
                                .replaceAll("%(?![0-9a-fA-F]{2})", "%25")
                                .replace("+", "");

                return generatedHmac;
        }
}