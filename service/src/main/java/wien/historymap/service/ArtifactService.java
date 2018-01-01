package wien.historymap.service;

import java.util.List;

public interface ArtifactService {

    void updateKeywordsForArtifact(Integer id, List<String> keywords);
}
