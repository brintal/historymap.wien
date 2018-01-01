package wien.historymap.service.impl;

import wien.historymap.service.OnbFileDownloader;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import wien.historymap.persistence.repo.ArtifactRepository;

import java.io.File;
import java.net.URL;
import java.util.List;

@Component
public class OnbFileDownloaderImpl implements OnbFileDownloader {


    private static final String DOWNLOAD_PATH = "D:/Dev/pictureStore/";


    @Autowired
    ArtifactRepository artifactRepository;

    @Override
    public void downloadAllPictures() {


        List<Integer> ids = artifactRepository.findAllOnbImageIds();

        int counter = 1;
        for (Integer bildId : ids) {

//            Integer bildId = 14596180;
            try {

                if (filesExists(bildId)) {
                    System.out.println(counter++ + " | " + bildId + " (already exists, skipped)");
                    continue;
                }

                File folderMain = new File(DOWNLOAD_PATH + bildId);
                folderMain.mkdir();

                String urlLarge = "http://www.bildarchivaustria.at/Preview/" + bildId + ".jpg";

                FileUtils.copyURLToFile(new URL(urlLarge), new File(folderMain.getAbsolutePath() + "/" + bildId + ".jpg"));


                System.out.println(counter++ + " | " + bildId);
            } catch (Exception e) {
                System.out.println("ERROR while downloading image with bildId " + bildId);
                e.printStackTrace();
            }

        }

    }

    public boolean filesExists(Integer onbImageId) {
        File f = new File(DOWNLOAD_PATH + onbImageId + "/" + onbImageId + ".jpg");
        File medium = new File(DOWNLOAD_PATH + onbImageId + "/medium/" + onbImageId + ".jpg");
        File icon = new File(DOWNLOAD_PATH + onbImageId + "/icon/" + onbImageId + ".jpg");
        return f.exists() && medium.exists() && icon.exists();
    }

    @Override
    public void checkPresenceOfAllFiles() {

        List<Integer> ids = artifactRepository.findAllOnbImageIds();

        int counter = 1;
        for (Integer bildId : ids) {
            if (!filesExists(bildId)) {
                System.out.println("no file found for onb image id " + bildId);
            } else {
                System.out.println(counter++ + " | " + bildId);
            }
        }
        File f = new File(DOWNLOAD_PATH);
        System.out.println("total folders: " + f.listFiles().length);
        System.out.println(ids.size() + " ids found");
        System.out.println(ids.stream().distinct().count() + " distinct ids found");
    }

    @Override
    public void copyAllMediumPicturesToTempFolder() {
        List<Integer> ids = artifactRepository.findAllOnbImageIds();

        int counter = 1;
        for (Integer bildId : ids) {
            try {
                File f = new File(DOWNLOAD_PATH + bildId + "/JPEG/" + bildId + ".jpg");
                File copiedFile = new File("D:/Dev/pictureStoreTest/" + bildId + ".jpg");

                FileUtils.copyFile(f, copiedFile);
                System.out.println("image finished: " + counter++);
            } catch (Exception e) {
                System.out.println("error while processing image " + bildId);
            }
        }
    }
    @Override
    public void renameFolders() {
        List<Integer> ids = artifactRepository.findAllOnbImageIds();

        int counter = 1;
        for (Integer bildId : ids) {
            try {
                File dir = new File(DOWNLOAD_PATH + bildId + "/JPEG/");
                File renameTo = new File(DOWNLOAD_PATH + bildId + "/medium/");
                dir.renameTo(renameTo);
                System.out.println("folder finished: " + counter++);
            } catch (Exception e) {
                System.out.println("error while processing folder " + bildId);
            }
        }
    }

    @Override
    public void copyAllIcons() {
        List<Integer> ids = artifactRepository.findAllOnbImageIds();

        int counter = 1;
        for (Integer bildId : ids) {
            try {
                File orig = new File("D:/Dev/pictureStoreTest/output/" + bildId + ".jpg");
                File folderMain = new File(DOWNLOAD_PATH + bildId+"/icon");
                folderMain.mkdir();

                FileUtils.copyFile(orig, new File(folderMain.getAbsolutePath() + "/" + bildId + ".jpg"));

                System.out.println("image finished: " + counter++);
            } catch (Exception e) {
                System.out.println("error while processing image " + bildId);
            }
        }
    }




}
