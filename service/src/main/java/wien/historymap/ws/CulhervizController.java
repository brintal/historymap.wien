package wien.historymap.ws;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wien.historymap.dto.SimpleArtifact;
import wien.historymap.persistence.repo.ArtifactRepository;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.net.URL;
import java.util.List;

@RestController
public class CulhervizController {

    @Autowired
    ArtifactRepository artifactRepository;

    private static final String DOWNLOAD_PATH = "/pictureStore/";
    private static final String ICON_PATH = "D:/Dev/";

    private static final String REQUEST_MAPPING_GET_ARTIFACT_IMAGE = "/getArtifactImage";

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/artifacts")
    public List<SimpleArtifact> artifacts() {

        System.out.println("get All Artifacts called");
        return artifactRepository.findAllByLocationIsNotNullAndYearIsNotNull();
//        return artifactRepository.findAllByLocationIsNotNullAndTechniqueIsNotNull();
//        return artifactRepository.findAllByLocationIsNotNullAndYearBetween(1970, 2000);

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = REQUEST_MAPPING_GET_ARTIFACT_IMAGE, method = RequestMethod.GET)
    public String getArtifactImage(@RequestParam(value = "id") Long artifactId, HttpServletRequest request, HttpServletResponse response) {
        try {
            //TODO this is only a workaround because the frontend messes up the popup positions if the images are loaded directly but everything works if they are sent as base64
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

    @CrossOrigin(origins = "http://localhost:4200")
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

}
