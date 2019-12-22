package wien.historymap.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Technique extends AbstractEntity {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "technique")
    private List<Artifact> artifacts;

    @JoinColumn(name = "category_id")
    @ManyToOne
    private TechniqueCategory category;

}
