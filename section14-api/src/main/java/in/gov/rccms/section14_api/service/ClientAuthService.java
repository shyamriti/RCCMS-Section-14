package in.gov.rccms.section14_api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.gov.rccms.section14_api.entity.TblClientAuth;
import in.gov.rccms.section14_api.repository.ClientAuthRepository;

@Service
public class ClientAuthService {

    @Autowired
    private ClientAuthRepository repository;

    public Optional<TblClientAuth> getClientByAppId(String appId) {
        return repository.findByAppId(appId);
    }
}