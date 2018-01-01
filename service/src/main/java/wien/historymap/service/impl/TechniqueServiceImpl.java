package wien.historymap.service.impl;

import wien.historymap.service.TechniqueService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import wien.historymap.domain.Technique;
import wien.historymap.persistence.repo.TechniqueRepository;

@Component
public class TechniqueServiceImpl implements TechniqueService {

    @Autowired
    TechniqueRepository techniqueRepository;

    @Override
    public Technique findOrCreateByName(String name) {

        if (StringUtils.isBlank(name))
            return null;

        Technique toRet = techniqueRepository.findByName(name.trim());
        if (toRet != null)
            return toRet;

        Technique newTechnique = new Technique();
        newTechnique.setName(name.trim());
        techniqueRepository.save(newTechnique);
        System.out.println("technique " +newTechnique.getName()+" created");
        return newTechnique;

    }
}
