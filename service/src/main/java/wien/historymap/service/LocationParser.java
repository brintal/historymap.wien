package wien.historymap.service;

import wien.historymap.service.impl.LocationParserImpl;
import org.springframework.transaction.annotation.Transactional;
import wien.historymap.domain.Artifact;
import wien.historymap.domain.Location;

public interface LocationParser {

    void parseAllLocations();

    @Transactional
    Location parseLocationForArtifact(Artifact artifact) throws LocationParserImpl.NoResultsException;
}
