package wien.historymap.service;


import wien.historymap.domain.Artifact;

public interface KeywordService {

    void persistAssignedKeyword(Artifact artifact, String keyword);
}
