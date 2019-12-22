package wien.historymap.dto;

import org.springframework.beans.factory.annotation.Value;

public interface SimpleArtifact {


    @Value("#{target.onbImageId}")
    Integer getId();

    String getTitle();

    Integer getYear();

    @Value("#{target.location.latitude}")
    Double getLatitude();

    @Value("#{target.location.longitude}")
    Double getLongitude();

    @Value("#{target.technique?.category?.name ?: 'not defined'}")
    String getTechniqueCategory();

}
