package wien.historymap.service;

public interface OnbFileDownloader {
    void downloadAllPictures();

    void checkPresenceOfAllFiles();

    void copyAllMediumPicturesToTempFolder();

    void copyAllIconPicturesToTempFolder();

    void renameFolders();

    void copyAllIcons();
}
