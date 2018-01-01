package wien.historymap.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Keyword {

    private static final String GENERATOR_NAME = "HIBERNATE_SEQUENCE_GENERATOR";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
    @SequenceGenerator(sequenceName = "hibernate_sequence", name = GENERATOR_NAME, allocationSize = 5)
    @Column(name = "id")
    private Integer id;

    @Column(name = "value")
    private String value;

    @ManyToMany(mappedBy = "keywords")
    private List<Artifact> artifacts;

}
