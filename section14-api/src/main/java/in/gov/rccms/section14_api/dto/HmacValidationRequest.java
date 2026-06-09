package in.gov.rccms.section14_api.dto;

public class HmacValidationRequest {

    private String transactionId;
    private String userId;
    private String appId;
    private String undersection;
    private String callbackUrl;
    private String hmac;

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getUndersection() {
        return undersection;
    }

    public void setUndersection(String undersection) {
        this.undersection = undersection;
    }

    public String getCallbackUrl() {
        return callbackUrl;
    }

    public void setCallbackUrl(String callbackUrl) {
        this.callbackUrl = callbackUrl;
    }

    public String getHmac() {
        return hmac;
    }

    public void setHmac(String hmac) {
        this.hmac = hmac;
    }
}