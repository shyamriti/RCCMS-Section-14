package in.gov.rccms.section14_api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.gov.rccms.section14_api.dto.SubmitSection14Request;
import in.gov.rccms.section14_api.service.SubmitSection14Service;

@RestController
@RequestMapping("/api")
public class SubmitSection14Controller {

    @Autowired
    private SubmitSection14Service submitSection14Service;

    @PostMapping("/submit-section14")
    public ResponseEntity<?> submitApplication(
            @RequestBody SubmitSection14Request request) {

        try {

            String caseId = submitSection14Service
                    .submitApplication(request);

            Map<String, Object> response = new HashMap<>();

            response.put("success", true);
            response.put("caseId", caseId);

            return ResponseEntity.ok(response);

        } catch (Exception ex) {

            ex.printStackTrace();

            Map<String, Object> response = new HashMap<>();

            response.put(
                    "success",
                    false);

            response.put(
                    "message",
                    ex.toString());

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }
    }
}