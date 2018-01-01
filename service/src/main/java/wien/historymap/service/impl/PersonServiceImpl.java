package wien.historymap.service.impl;

import wien.historymap.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import wien.historymap.domain.Person;
import wien.historymap.persistence.repo.PersonRepository;

@Component
public class PersonServiceImpl implements PersonService {


    @Autowired
    PersonRepository personRepository;

    @Override
    public Person getOrCreatePerson(String name, String dnbUrl, String zettelUrl, String wikipediaUrl, String biographienUrl, String musiklexikonUrl) {

        Person existingPerson = personRepository.findByNameAndDnbUrlAndZettelkatalogUrlAndWikipediaUrlAndBiographienUrlAndMusiklexikonUrl(name, dnbUrl, zettelUrl, wikipediaUrl, biographienUrl, musiklexikonUrl);

        if (existingPerson != null) {

            return existingPerson;

        } else {
            Person newPerson = new Person();
            newPerson.setName(name);
            newPerson.setDnbUrl(dnbUrl);
            newPerson.setZettelkatalogUrl(zettelUrl);
            newPerson.setWikipediaUrl(wikipediaUrl);
            newPerson.setBiographienUrl(biographienUrl);
            newPerson.setMusiklexikonUrl(musiklexikonUrl);
            System.out.println("new person: " + newPerson);
            return personRepository.save(newPerson);
        }

    }
}
