package wien.historymap.service.impl;

import wien.historymap.service.ArtifactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import wien.historymap.domain.Artifact;
import wien.historymap.domain.Keyword;
import wien.historymap.persistence.repo.ArtifactRepository;
import wien.historymap.persistence.repo.KeywordRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class ArtifactServiceImpl implements ArtifactService {


    @Autowired
    ArtifactRepository artifactRepository;

    @Autowired
    KeywordRepository keywordRepository;

    @Transactional
    @Override
    public void updateKeywordsForArtifact(Integer id, List<String> keywords) {
        Artifact artifact = artifactRepository.findById(id).get();

        Set<Keyword> keywordList = new HashSet<>();

        for (String keyword : keywords) {
            keywordList.add(keywordRepository.findByValue(keyword));
        }

        artifact.setKeywords(keywordList);
        artifactRepository.save(artifact);
    }
}
