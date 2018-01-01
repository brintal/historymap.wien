package wien.historymap.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@Data
@IdClass(AuthorPK.class)
public class Author {

    @Id
    @Column(name = "artifact_id")
    private Integer artifactId;

    @Id
    @Column(name = "person_id")
    private Integer personId;

}
