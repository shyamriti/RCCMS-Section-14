package in.gov.rccms.section14_api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblclientauth")
public class TblClientAuth {

    @Id
    @Column(name = "app_id")
    private String appId;

    @Column(name = "app_key")
    private String appKey;

    @Column(name = "application_name")
    private String applicationName;

    // Getters

    public String getAppId() {
        return appId;
    }

    public String getAppKey() {
        return appKey;
    }

    public String getApplicationName() {
        return applicationName;
    }

    // Setters

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    @Override
    public String toString() {
        return "TblClientAuth{" +
                "appId='" + appId + '\'' +
                ", appKey='" + appKey + '\'' +
                ", applicationName='" + applicationName + '\'' +
                '}';
    }
}