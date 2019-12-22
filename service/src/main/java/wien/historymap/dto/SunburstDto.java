package wien.historymap.dto;

import lombok.Data;

import java.util.List;

@Data
public class SunburstDto {

    String name;
    Long value;
    List<SunburstDto> children;
}
