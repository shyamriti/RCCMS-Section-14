package in.gov.rccms.section14_api.dto;

import com.fasterxml.jackson.databind.JsonNode;

public class SubmitSection14Request {

    private String appId;
    private String appKey;
    private JsonNode caseData;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppKey() {
        return appKey;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public JsonNode getCaseData() {
        return caseData;
    }

    public void setCaseData(JsonNode caseData) {
        this.caseData = caseData;
    }
}