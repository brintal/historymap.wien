package wien.historymap.persistence.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import wien.historymap.domain.Technique;
import wien.historymap.domain.TechniqueCategory;


public interface TechniqueCategoryRepository extends JpaRepository<TechniqueCategory, Integer>, JpaSpecificationExecutor<TechniqueCategory> {

}
