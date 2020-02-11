package wien.historymap.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Data
@Entity
public class Location extends AbstractEntity {

    @Column(name = "lat")
    private Double latitude;

    @Column(name = "lng")
    private Double longitude;

    @Column(name = "formatted_address")
    private String formattedAddress;

    @OneToOne(mappedBy = "location")
    @JsonBackReference
    private Artifact artifact;

}
