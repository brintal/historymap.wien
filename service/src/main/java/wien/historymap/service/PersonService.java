package wien.historymap.service;


import wien.historymap.domain.Person;

public interface PersonService {

    Person getOrCreatePerson(String name, String dnbUrl, String zettelUrl, String wikipediaUrl, String biographienUrl, String musiklexikonUrl);

}
