package wien.historymap.dto;

import org.springframework.beans.factory.annotation.Value;

public interface KeywordSummary {

    Integer getId();

    @Value("#{target.value}")
    String getText();

    @Value("#{target.artifacts.size()}")
    Long getSize();
}
