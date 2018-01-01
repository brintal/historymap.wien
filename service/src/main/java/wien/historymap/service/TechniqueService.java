package wien.historymap.service;


import wien.historymap.domain.Technique;

public interface TechniqueService {

    Technique findOrCreateByName(String name);
}
