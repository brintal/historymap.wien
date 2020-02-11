package wien.historymap.persistence.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import wien.historymap.domain.Artifact;
import wien.historymap.dto.SimpleArtifact;

import java.util.List;


public interface ArtifactRepository extends JpaRepository<Artifact, Integer>, JpaSpecificationExecutor<Artifact> {

    @Query("select a.id from Artifact a")
    List<Integer> findAllIds();

    @Query("select a.onbImageId from Artifact a")
    List<Integer> findAllOnbImageIds();

    @Query("select a from Artifact a where a.location is null and a.locationLastUpdated is null")
    List<Artifact> findAllWithoutLocation();

    @Query("select a from Artifact a where a.location is not null")
    List<Artifact> findAllWithLocation();

    List<Artifact> findAllByLocationIsNotNullAndYearIsNotNull();

    List<Artifact> findAllByLocationIsNotNullAndTechniqueIsNotNullAndYearIsNotNull();

    List<SimpleArtifact> findAllByLocationIsNotNullAndYearBetween(Integer yearMin, Integer yearMax);

    Long countByTechniqueNullAndYearIsNotNullAndLocationIsNotNull();


}
