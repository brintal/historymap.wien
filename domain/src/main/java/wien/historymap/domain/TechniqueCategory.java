package wien.historymap.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
public class TechniqueCategory extends AbstractEntity {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Technique> techniques;

}
