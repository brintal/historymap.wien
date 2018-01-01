package wien.historymap.service;


import java.io.IOException;

public interface OnbParser {
    void getAllCategories() throws IOException;

    void parseKeywords() throws IOException;

    void getAllKeywords() throws IOException;

    void parseAllArtifacts();
    void parseAllTechniques();

    void updateAllTitles();

    void parseAllAuthors();

    void parseWeitereTitel();
}
