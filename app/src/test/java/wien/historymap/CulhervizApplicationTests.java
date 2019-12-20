package wien.historymap;

import wien.historymap.service.OnbFileDownloader;
import wien.historymap.service.OnbParser;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CulhervizApplicationTests {


    @Autowired
    OnbParser onbParser;
    @Autowired
    OnbFileDownloader onbFileDownloader;

    @Test
    public void contextLoads() {
//        onbFileDownloader.copyAllIconPicturesToTempFolder();
//        onbParser.updateAllTitles();
    }

}





