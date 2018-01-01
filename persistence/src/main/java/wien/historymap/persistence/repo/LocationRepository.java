package wien.historymap.persistence.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import wien.historymap.domain.Location;


public interface LocationRepository extends JpaRepository<Location, Integer>, JpaSpecificationExecutor<Location> {


}
