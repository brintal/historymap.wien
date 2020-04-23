package wien.historymap.persistence.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import wien.historymap.domain.Keyword;
import wien.historymap.dto.KeywordSummary;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Integer>, JpaSpecificationExecutor<Keyword> {

        Keyword findByValue(String value);

        @Query("select k from Keyword k order by k.artifacts.size desc")
        List<KeywordSummary> findAllKeywordSummary();

}
