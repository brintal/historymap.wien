package wien.historymap.persistence.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import wien.historymap.domain.Keyword;

public interface KeywordRepository extends JpaRepository<Keyword, Integer>, JpaSpecificationExecutor<Keyword> {

        Keyword findByValue(String value);

}
