package wien.historymap.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

@Data
public class MotifPK implements Serializable {

    @Column(name = "artifact_id")
    @Id
    private Integer artifactId;

    @Column(name = "person_id")
    @Id
    private Integer personId;

}
