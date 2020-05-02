package wien.historymap.service.impl;

import wien.historymap.service.OnbParser;
import wien.historymap.service.PersonService;
import wien.historymap.service.TechniqueService;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import wien.historymap.domain.Artifact;
import wien.historymap.domain.Keyword;
import wien.historymap.domain.Person;
import wien.historymap.domain.Technique;
import wien.historymap.persistence.repo.ArtifactRepository;
import wien.historymap.persistence.repo.KeywordRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


@Component
public class OnbParserImpl implements OnbParser {

    @Autowired
    ArtifactRepository artifactRepository;

    @Autowired
    TechniqueService techniqueService;

    @Autowired
    PersonService personService;

    @Autowired
    KeywordRepository keywordRepository;

    public void myTest2() throws IOException {

        //		scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12257791", 1);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12257812", 2);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12259992", 3);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12259997", 4);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260031", 5);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260072", 6);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260081", 7);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260077", 8);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260086", 9);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260199", 10);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260203", 11);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260207", 12);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260211", 13);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260215", 14);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260220", 15);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260252", 16);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260256", 17);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260260", 18);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260264", 19);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260268", 20);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260272", 21);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260276", 22);
//        scrapeBezirk("http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12260280", 23);


    }

    public void scrapeBezirk(String url, int bezirk) throws IOException {

        Document doc = Jsoup.connect(url).get();

        Element masthead = doc.select("div.mod-images-1sp-4").first();
        Elements aList = masthead.select("a");

        for (int i = 0; i < aList.size(); i++) {
            Element aElement = aList.get(i);
            String absHref = aElement.attr("abs:href");
            scapePage(absHref, bezirk);
        }

        System.out.println("bezirk " + bezirk + " finished.");

    }

    public void scapePage(String url, int bezirk) throws IOException {
        Document doc = Jsoup.connect(url).get();
        Elements imagesIconTexts = doc.select("div.ImageIconText");
        for (int i = 0; i < imagesIconTexts.size(); i++) {
            Element aElement = imagesIconTexts.get(i);
            String bildId = aElement.text().split(" -")[0].substring(1);
            createArtifact(bildId, bezirk);
        }

        Element masthead = doc.select("div.toc-index").first();
        Elements aList = masthead.select("a");
        Element aWeiter = aList.stream().filter(element -> element.text().equals("Weiter")).findFirst().orElse(null);

        if (aWeiter != null) {
            String absHref = aWeiter.attr("abs:href");
            scapePage(absHref, bezirk);
        }


    }

    @Transactional
    public void createArtifact(String bildId, int bezirk) {
        Artifact newArtifact = new Artifact();
        newArtifact.setOnbImageId(Integer.parseInt(bildId));
        newArtifact.setDistrict(bezirk);

        artifactRepository.save(newArtifact);
    }

    @Override
    public void getAllCategories() throws IOException {


        String url = "http://www.bildarchivaustria.at/Pages/ImageDetail.aspx?p_iBildID=";

        List<Artifact> artifacts = artifactRepository.findAll();

        HashSet<String> categories = new HashSet<>();

        int counter = 1;
        for (Artifact artifact : artifacts) {

            Document doc = Jsoup.connect(url + artifact.getOnbImageId()).get();

            Element categoryTable = doc.select("table").last();

            Element tbody = categoryTable.select("tbody").first();
            Elements trs = categoryTable.select("tr");

            for (Element tr : trs) {
                categories.add(tr.select("td").first().text());
            }

            System.out.println("artifact " + counter + " finished");
            counter++;

        }

        categories.forEach(s -> System.out.println(s));

//        Bildnachweis
//                Beschreibung
//        Schlagworte
//                Autor
//        Datierung
//                Orte
//        Technik
//                Inventarnummer
//        Digitale Sammlung
//        Titel
//                Personen
//        Weitere Titel
//        Körperschaft

    }

    @Override
    public void parseKeywords() throws IOException {


//        String url = "http://www.bildarchivaustria.at/Pages/ImageDetail.aspx?p_iBildID=";
//
//        List<Artifact> artifacts = artifactRepository.findAll();
//
//        HashSet<String> keywords = new HashSet<>();
//
//        int counter = 1;
//        for (Artifact artifact : artifacts) {
//
//            Document doc = Jsoup.connect(url + artifact.getOnbImageId()).get();
//
//            Element categoryTable = doc.select("table").last();
//
//            Element tbody = categoryTable.select("tbody").first();
//            Elements trs = categoryTable.select("tr");
//
//            for (Element tr : trs) {
//
//                if(tr.select("td").first().text().contains("Schlagworte")) {
//
//                    String[] rawKeywords = tr.select("td").last().text().split(",");
//                    artifactService.updateKeywordsForArtifact(artifact.getId(), Arrays.stream(rawKeywords).map(s->s.trim()).distinct().collect(Collectors.toList()));
//
//                }
//
//
//            }
//
//            artifactRepository.save(artifact);
//
//            System.out.println("artifact " + counter + " finished");
//            counter++;
//
//        }

    }

    @Override
    public void getAllKeywords() throws IOException {

        String url = "http://www.bildarchivaustria.at/Pages/ImageDetail.aspx?p_iBildID=";

        List<Artifact> artifacts = artifactRepository.findAll();

        HashSet<String> keywords = new HashSet<>();

        int counter = 1;
        for (Artifact artifact : artifacts) {

            Document doc = Jsoup.connect(url + artifact.getOnbImageId()).get();

            Element categoryTable = doc.select("table").last();

            Element tbody = categoryTable.select("tbody").first();
            Elements trs = categoryTable.select("tr");

            for (Element tr : trs) {

                if (tr.select("td").first().text().contains("Schlagworte")) {

                    String[] rawKeywords = tr.select("td").last().text().split(",");

                    for (String keyword : rawKeywords) {
                        keywords.add(keyword.trim());
                    }


                }


            }

            System.out.println("artifact " + counter + " finished");
            counter++;

//            if(counter>5) {
//                break;
//            }

        }

        keywords.stream().sorted(Comparator.comparing(s -> s)).forEach(s -> {
            Keyword keyword = new Keyword();
            keyword.setValue(s);
            keywordRepository.save(keyword);
        });
    }

    @Transactional
    public void parseArtifact(Integer id) {

        try {

            String url = "http://www.bildarchivaustria.at/Pages/ImageDetail.aspx?p_iBildID=";

            Artifact artifact = artifactRepository.findById(id).get();

            Document doc = Jsoup.connect(url + artifact.getOnbImageId()).get();

            Element categoryTable = doc.select("table").last();

            Element tbody = categoryTable.select("tbody").first();
            Elements trs = categoryTable.select("tr");

            for (Element tr : trs) {

                String category = tr.select("td").first().text();

                if (category.equals("Bildnachweis")) {
                    artifact.setPictureCredits(tr.select("td").last().text());
                } else if (category.equals("Beschreibung")) {
                    artifact.setDescription(tr.select("td").last().text());
                } else if (category.equals("Datierung")) {
                    String dateText = tr.select("td").last().text();
                    artifact.setDateText(dateText);
                    String year = dateText.replaceAll("[^\\d.]", "");
                    if (year.contains(".")) {
                        String[] yearParts = year.split("\\.");
                        year = yearParts[yearParts.length - 1];
                    }
                    artifact.setYear(Integer.parseInt(year));
                } else if (category.equals("Orte")) {
                    artifact.setPlace(tr.select("td").last().text());
                } else if (category.equals("Inventarnummer")) {
                    artifact.setInventoryNumber(tr.select("td").last().text());
                } else if (category.equals("Digitale Sammlung")) {
                    artifact.setDigitalCollection(tr.select("td").last().text());
                } else if (category.equals("Titel")) {
                    artifact.setTitle(tr.select("td").last().text());
                } else if (category.equals("Weitere Titel")) {
                    artifact.setAdditionalTitle(tr.select("td").last().text());
                } else if (category.equals("Körperschaft")) {
                    artifact.setCorporateBody(tr.select("td").last().text());
                }

            }

            artifactRepository.save(artifact);
        } catch (Exception e) {
            System.out.println("Error while parsing artifact with id " + id);
            e.printStackTrace();
            throw new RuntimeException();
        }


    }


    @Override
    @Transactional
    public void parseAllArtifacts() {

        List<Artifact> artifacts = artifactRepository.findAll();

        int counter = 1;
        for (Artifact artifact : artifacts) {


            parseArtifact(artifact.getId());

            System.out.println("artifact " + counter + " finished (id " + artifact.getId() + ")");
            counter++;

//            if (counter > 2) {
//                break;
//            }

        }

    }


    @Transactional
    public void parseAllTechniques() {

        List<Artifact> artifacts = artifactRepository.findAll();


        int counter = 1;
        for (Artifact artifact : artifacts) {


            parseTechniquesOfArtifact(artifact.getId());

            System.out.println("artifact " + counter + " finished (id " + artifact.getId() + ")");
            counter++;

        }
    }


    @Transactional
    public void parseTechniquesOfArtifact(Integer artifactId) {
        Technique technique = techniqueService.findOrCreateByName(parseValueForCategory(artifactId, "Technik", false));
        if (technique != null) {
            Artifact artifact = artifactRepository.findById(artifactId).get();
            artifact.setTechnique(technique);
            artifactRepository.save(artifact);
        }
    }


    @Transactional
    @Override
    public void updateAllTitles() {

        List<Integer> ids = artifactRepository.findAllIds();

        int count = 1;
        for (Integer id : ids) {
            String parsedTitle = parseValueForCategory(id, "Titel", false);
            Artifact artifact = artifactRepository.findById(id).get();

            if (!parsedTitle.equals(artifact.getTitle())) {
                System.out.println(artifact.getTitle() + " -> " + parsedTitle);
                artifact.setTitle(parsedTitle != null ? parsedTitle.trim() : null);
                artifactRepository.save(artifact);
            }
            System.out.println(count++);
        }

    }


    public String parseValueForCategory(Integer artifactId, String categoryName, boolean html) {
        try {

            String url = "http://www.bildarchivaustria.at/Pages/ImageDetail.aspx?p_iBildID=";

            Artifact artifact = artifactRepository.findById(artifactId).get();

            Document doc = Jsoup.connect(url + artifact.getOnbImageId()).get();

            Element categoryTable = doc.select("table").last();

            Elements trs = categoryTable.select("tr");


            Element row = trs.stream()
                    .filter(tr -> tr.select("td").first().text().equals(categoryName))
                    .findFirst()
                    .orElseThrow(() -> new CategoryNotFoundException("category " + categoryName + "not found"));

            if (html)
                return row.select("td").last().html();

            return row.select("td").last().text();

        } catch (CategoryNotFoundException e) {
//            System.out.println(e.getMessage() + " skipping artifact with id " + artifactId);
            return null;
        } catch (Exception e) {
            System.out.println("Error while parsing artifact with id " + artifactId);
            e.printStackTrace();
            throw new RuntimeException();
        }


    }

    private class CategoryNotFoundException extends Exception {

        public CategoryNotFoundException(String s) {
            super(s);
        }
    }

    @Override
    @Transactional
    public void parseAllAuthors() {

        List<Artifact> artifacts = artifactRepository.findAll();


//        Artifact artifact = artifactRepository.findById(10059316).get();
        int counter = 1;
        for (Artifact artifact : artifacts) {

            System.out.println(counter + ": processing artifact with Id " + artifact.getId());

//            artifact.setAuthors(parsePersonsOfArtifact(artifact.getId(), "Autor"));
//            artifact.setMotifs(parsePersonsOfArtifact(artifact.getId(), "Personen"));

            artifactRepository.save(artifact);

            counter++;
        }


    }


    @Transactional
    public List<Person> parsePersonsOfArtifact(Integer artifactId, String categoryName) {

        String personsHtml = parseValueForCategory(artifactId, categoryName, true);
        if (StringUtils.isBlank(personsHtml))
            return null;

        String[] rawPersons = personsHtml.split("<br>");

        List<Person> persons = new ArrayList<>();

        for (String author : rawPersons) {
            persons.add(parseRawPerson(author));

        }

        return persons.stream().distinct().collect(Collectors.toList());

    }


    public Person parseRawPerson(String rawPersonString) {

        String spanId = "<span onclick=\"window.open(\'";
        String cursorId = "cursor:pointer";
        String endUrlId = "\',\'\',\'\')";
        String dnbInfoId = "d-nb.info";
        String zettelIdId = "ZettelID";
        String wikipediaId = "wikipedia";
        String biographienId = "biographien";
        String musiklexikonId = "musiklexikon";

        String rawName = null;
        String rawDnbUrl = null;
        String rawZettelUrl = null;
        String rawWikipediaUrl = null;
        String rawBiographienUl = null;
        String rawMusiklexikonUrl = null;

        if (!rawPersonString.contains(spanId)) {
            rawName = rawPersonString;
        } else {
            String[] parts = rawPersonString.split(Pattern.quote(spanId));

            for (String part : parts) {
                if (!part.contains(cursorId)) {
                    rawName = part.trim();
                    if (rawName.contains("(")) {
                        rawName = rawName.substring(0, rawName.indexOf("(")).trim();
                    }
                } else if (part.contains(dnbInfoId)) {
                    rawDnbUrl = part.substring(0, part.indexOf(endUrlId)).trim();
                } else if (part.contains(zettelIdId)) {
                    rawZettelUrl = part.substring(0, part.indexOf(endUrlId)).trim();
                } else if (part.contains(wikipediaId)) {
                    rawWikipediaUrl = part.substring(0, part.indexOf(endUrlId)).trim();
                } else if (part.contains(biographienId)) {
                    rawBiographienUl = part.substring(0, part.indexOf(endUrlId)).trim();
                } else if (part.contains(musiklexikonId)) {
                    rawMusiklexikonUrl = part.substring(0, part.indexOf(endUrlId)).trim();
                } else {
                    System.out.println("unknown link found: " + part);
                }
            }
        }

        return personService.getOrCreatePerson(rawName, rawDnbUrl, rawZettelUrl, rawWikipediaUrl, rawBiographienUl, rawMusiklexikonUrl);

//        System.out.println("rawName: "+rawName);
//        System.out.println("rawDnbUrl: "+rawDnbUrl);
//        System.out.println("rawZettelUrl: "+rawZettelUrl);
//        System.out.println("rawWikipediaUrl: "+rawWikipediaUrl);
//        System.out.println("rawBiographienUl: "+rawBiographienUl);
//        System.out.println("rawMusiklexikonUrl: "+rawMusiklexikonUrl);


    }

    @Transactional
    @Override
    public void parseWeitereTitel() {
        int counter = 1;
        for (Artifact artifact : artifactRepository.findAll()) {
            String weitereTitelValue = parseValueForCategory(artifact.getId(), "Weitere Titel", false);
            if (StringUtils.isNotBlank(weitereTitelValue)) {
                artifact.setAdditionalTitle(weitereTitelValue);
                artifactRepository.save(artifact);
                System.out.println("weitere titel found and updated for " + artifact.getId() + ". Value: " + weitereTitelValue);
            }

            System.out.println(counter++);


        }
    }


}
