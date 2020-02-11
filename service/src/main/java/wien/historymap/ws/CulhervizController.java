package wien.historymap.ws;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wien.historymap.domain.Artifact;
import wien.historymap.domain.Technique;
import wien.historymap.domain.TechniqueCategory;
import wien.historymap.dto.SimpleArtifact;
import wien.historymap.dto.SunburstDto;
import wien.historymap.persistence.repo.ArtifactRepository;
import wien.historymap.persistence.repo.TechniqueCategoryRepository;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CulhervizController {

    @Autowired
    ArtifactRepository artifactRepository;

    @Autowired
    TechniqueCategoryRepository techniqueCategoryRepository;

    private static final String DOWNLOAD_PATH = "/pictureStore/";
    private static final String ICON_PATH = "D:/Dev/";

    private static final String REQUEST_MAPPING_GET_ARTIFACT_IMAGE = "/getArtifactImage";

    @RequestMapping("/artifacts")
    @Cacheable("artifacts")
    public List<Artifact> artifacts() {


        Date before = new Date();
        System.out.println("get All Artifacts called");
        List<Artifact> toRet = artifactRepository.findAllByLocationIsNotNullAndYearIsNotNull();
//        List<Artifact> toRet = artifactRepository.findAllByLocationIsNotNullAndTechniqueIsNotNullAndYearIsNotNull();
//        List<SimpleArtifact> toRet = artifactRepository.findAllByLocationIsNotNullAndYearBetween(1970, 2000);
        Date after = new Date();
        System.out.println("get All Artifacts finished. took " + (after.getTime() - before.getTime()) + "seconds and found " + toRet.size() + " artifacts.");

        return toRet;

    }

    @RequestMapping(value = REQUEST_MAPPING_GET_ARTIFACT_IMAGE, method = RequestMethod.GET)
    public String getArtifactImage(@RequestParam(value = "id") Long artifactId, HttpServletRequest request, HttpServletResponse response) {
        try {
            //TODO this is only a workaround because the frontend messes up the popup positions if the images are loaded directly but everything works if they are sent as base64
            // config pictureStore directory in yaml and read file via inputstream
            URL imageURL = new URL("http://localhost:8080/pictureStore/" + artifactId + "/medium/" + artifactId + ".jpg");
            BufferedImage originalImage = ImageIO.read(imageURL);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(originalImage, "jpg", baos);
            return Base64.encodeBase64String(baos.toByteArray());

//            File file = new File(DOWNLOAD_PATH + artifactId + "/medium/" + artifactId + ".jpg");
//            return Base64.encodeBase64String(FileUtils.readFileToByteArray(file));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            e.printStackTrace();
        }

        return null;
    }


    private int counter = 0;

    @RequestMapping(value = "/getArtifactImageIcon", method = RequestMethod.GET)
    public String getArtifactImageIcon(@RequestParam(value = "id") Long artifactId, HttpServletResponse response) {
        try {
            File file = new File(DOWNLOAD_PATH + artifactId + "/icon/" + artifactId + ".jpg");
            return Base64.encodeBase64String(FileUtils.readFileToByteArray(file));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            e.printStackTrace();
        }

        return null;
    }


    @RequestMapping(value = "/getFullSizeArtifactImage", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@RequestParam("id") Long artifactId, HttpServletResponse response) {
        try {
            File file = new File(DOWNLOAD_PATH + artifactId + "/" + artifactId + ".jpg");
            byte[] image = FileUtils.readFileToByteArray(file);  //this just gets the data from a database
            response.setContentType(MediaType.IMAGE_JPEG_VALUE);
            return ResponseEntity.ok(image);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            e.printStackTrace();
        }
        return null;
    }

    @Transactional(readOnly = true)
    @RequestMapping(value = "/getSunburstTechniqueData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public SunburstDto getSunburstTechniqueData() {
        System.out.println("getSunburstTechniqueData called");
        try {
            SunburstDto toRet = new SunburstDto();
            toRet.setName("Techniken");
            toRet.setChildren(new ArrayList<>());
            for (TechniqueCategory category : techniqueCategoryRepository.findAll()) {
                SunburstDto categoryDto = new SunburstDto();
                categoryDto.setChildren(new ArrayList<>());
                categoryDto.setName(category.getName());
                for (Technique technique : category.getTechniques()) {
                    SunburstDto techniqueDto = new SunburstDto();
                    techniqueDto.setName(technique.getName());
                    techniqueDto.setValue((long) technique.getArtifacts().size());
                    categoryDto.getChildren().add(techniqueDto);
                }
                toRet.getChildren().add(categoryDto);
            }

            SunburstDto undefined = new SunburstDto();
            undefined.setName("Nicht zugeordnet");
            undefined.setValue(artifactRepository.countByTechniqueNullAndYearIsNotNullAndLocationIsNotNull());
            toRet.getChildren().add(undefined);

            System.out.println("getSunburstTechniqueData finished");
            return toRet;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
