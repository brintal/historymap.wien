package wien.historymap;

import wien.historymap.service.LocationParser;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import wien.historymap.persistence.repo.ArtifactRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LocationParserTests {

    @Autowired
    LocationParser locationParser;

    @Autowired
    ArtifactRepository artifactRepository;

    @Test
    public void contextLoads() {
//        int count = 1;
//        for (Artifact artifact : artifactRepository.findAllWithoutLocation()) {
//            Location location = null;
//            try {
//                location = locationParser.parseLocationForArtifact(artifact);
//                if (location != null) {
//                    artifact.setLocation(location);
//                    artifact.setLocationLastUpdated(new Date());
//                    artifactRepository.save(artifact);
//                }
//
//            } catch (LocationParserImpl.NoResultsException e) {
//                artifact.setLocationLastUpdated(new Date());
//                artifactRepository.save(artifact);
//                System.out.println("no results");
//            }
//            System.out.println(count++ + " | " + artifact.getOnbImageId());
//        }
    }

}
