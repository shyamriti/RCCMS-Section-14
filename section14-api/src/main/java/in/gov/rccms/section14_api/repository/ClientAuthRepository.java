package in.gov.rccms.section14_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.gov.rccms.section14_api.entity.TblClientAuth;

@Repository
public interface ClientAuthRepository
        extends JpaRepository<TblClientAuth, String> {

    Optional<TblClientAuth> findByAppId(String appId);

}