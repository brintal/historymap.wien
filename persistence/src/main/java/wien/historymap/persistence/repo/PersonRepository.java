package wien.historymap.persistence.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import wien.historymap.domain.Person;


public interface PersonRepository extends JpaRepository<Person, Integer>, JpaSpecificationExecutor<Person> {


    Person findByName(String name);

    Person findByNameAndDnbUrlAndZettelkatalogUrlAndWikipediaUrlAndBiographienUrlAndMusiklexikonUrl(String name, String dnbUrl, String zettelUrl, String wikipediaUrl, String biographienUrl, String musiklexikonUrl);
}
