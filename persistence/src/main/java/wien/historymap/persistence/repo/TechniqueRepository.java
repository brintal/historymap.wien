package wien.historymap.persistence.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import wien.historymap.domain.Technique;


public interface TechniqueRepository extends JpaRepository<Technique, Integer>, JpaSpecificationExecutor<Technique> {

    Technique findByName(String name);

}
