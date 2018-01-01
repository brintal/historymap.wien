package wien.historymap.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@Data
@IdClass(AssignedKeywordPK.class)
public class AssignedKeyword {

    @Id
    @Column(name = "artifact_id")
    private Integer artifactId;

    @Id
    @Column(name = "keyword_id")
    private Integer keywordId;

}
