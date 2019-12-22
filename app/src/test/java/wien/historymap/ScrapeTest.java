package wien.historymap;

import org.junit.Test;

import java.io.IOException;

public class ScrapeTest {


    @Test
    public void myTest() throws IOException {

//        int id = 1000000;
//
//
//        while (id < 2000000) {
//
//            String url = "http://www.bildarchivaustria.at/Pages/ImageDetail.aspx?p_iBildID=" + id;
//
//            Document doc = Jsoup.connect(url).get();
//            Elements tables = doc.select("table"); //select the first table.
//            if (tables.size() == 0) {
//                System.out.println("id " + id + " -> NO HIT");
//                id++;
//                continue;
//
//            }
//            Element table = tables.get(1); //select the first table.
//            Element tbody = table.select("tbody").get(0);
//            Elements rows = tbody.select("tr");
//
//            for (int i = 0; i < rows.size(); i++) { //first row is the col names so skip it.
//                Element row = rows.get(i);
//                Elements cols = row.select("td");
//
//                for (int j = 0; j < cols.size(); j++) { //first row is the col names so skip it.
//                    //System.out.print(cols.get(j).text() + "|");
//                }
//                //System.out.println("");
//
//            }
//
//            System.out.println("id " + id + " processed");
//
//            id++;
//
//
//        }

    }
//
//    @Test
//    public void myTest2() throws IOException {
//
//
//        String url = "http://www.bildarchivaustria.at/Pages/Themen.aspx?p_iCollectionID=9846792&p_iKlassifikationID=12257731&p_iSubKlassifikationID=12257791";
//
//        Document doc = Jsoup.connect(url).get();
//
//        Element masthead = doc.select("div.mod-images-1sp-4").first();
//        Elements aList = masthead.select("a");
//
//        for (int i = 0; i < aList.size(); i++) {
//            Element aElement = aList.get(i);
//            String absHref = aElement.attr("abs:href");
//            scrapeYear(absHref);
//        }
//
//    }
//
//    public void scrapeYear(String url, int bezirk) throws IOException {
//
//        Document doc = Jsoup.connect(url).get();
//
//        Element masthead = doc.select("div.toc-index").first();
//
//        Elements aList = masthead.select("a");
//
//        for (int i = 0; i < aList.size(); i++) {
//
//            Element aElement = aList.get(i);
//            String absHref = aElement.attr("abs:href");
//            scapePage(absHref);
//        }
//
//    }
//
//    public void scapePage(String url, int bezirk) throws IOException {
//        Document doc = Jsoup.connect(url).get();
//
//        Elements imagesIconTexts = doc.select("div.ImageIconText");
//
//        for (int i = 0; i < imagesIconTexts.size(); i++) {
//
//            Element aElement = imagesIconTexts.get(i);
//            String bildId = aElement.text().split(" - ")[0].substring(1);
//
//            System.out.println(bildId);
//        }
//
//    }


}
