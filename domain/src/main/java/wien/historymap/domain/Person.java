package wien.historymap.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.List;

@Data
@Entity
public class Person extends AbstractEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "dnb_url")
    private String dnbUrl;

    @Column(name = "zettelkatalog_url")
    private String zettelkatalogUrl;

    @Column(name = "wikipedia_url")
    private String wikipediaUrl;

    @Column(name = "biographien_url")
    private String biographienUrl;

    @Column(name = "musiklexikon_url")
    private String musiklexikonUrl; //see http://www.bildarchivaustria.at/Pages/ImageDetail.aspx?p_iBildID=13823655

    @ManyToMany(mappedBy = "authors")
    private List<Artifact> createdArtifacts;

    @ManyToMany(mappedBy = "motifs")
    private List<Artifact> picturedIn;

}
