package wien.historymap.service.impl;

import wien.historymap.service.KeywordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import wien.historymap.domain.Artifact;
import wien.historymap.domain.Keyword;
import wien.historymap.persistence.repo.KeywordRepository;

import java.util.ArrayList;

@Component
public class KeywordServiceImpl implements KeywordService {


    @Autowired
    KeywordRepository keywordRepository;

    @Transactional
    @Override
    public void persistAssignedKeyword(Artifact artifact, String keyword) {

        Keyword keywordObject = keywordRepository.findByValue(keyword);

        if (keywordObject.getArtifacts() == null) {
            keywordObject.setArtifacts(new ArrayList<>());
        }
        keywordObject.getArtifacts().add(artifact);

        keywordRepository.save(keywordObject);

    }
}
