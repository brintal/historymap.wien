package wien.historymap.service.impl;

import wien.historymap.service.LocationParser;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.AddressComponentType;
import com.google.maps.model.GeocodingResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import wien.historymap.domain.Artifact;
import wien.historymap.domain.Location;
import wien.historymap.persistence.repo.ArtifactRepository;
import wien.historymap.persistence.repo.LocationRepository;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class LocationParserImpl implements LocationParser {


    @Value("${google.apikey}")
    private String googleGeocodeApiKey;

    @Autowired
    ArtifactRepository artifactRepository;

    @Autowired
    LocationRepository locationRepository;

    @Transactional
    @Override
    public void parseAllLocations() {



    }

    @Override
    @Transactional
    public Location parseLocationForArtifact(Artifact artifact) throws NoResultsException {

        String address = extractAddress(artifact);

        try {
            GeoApiContext context = new GeoApiContext.Builder()
                    .apiKey(googleGeocodeApiKey)
                    .build();
            GeocodingResult[] results = GeocodingApi.geocode(context, address).await();

            if (results.length == 1) {
                log.debug("Address found for " + artifact.getOnbImageId() + ": " + results[0].formattedAddress + " | raw address: " + address);
                return handleSingleResult(artifact, results[0]);
            }
            if (results.length > 1) {
                return handleMultiResult(artifact, results);
            }

        } catch (Exception e) {
            log.debug(e.getMessage() + " | " + artifact.getOnbImageId());
            return null;
        }
        throw new NoResultsException();
    }

    private Location handleMultiResult(Artifact artifact, GeocodingResult[] results) {
        List<GeocodingResult> correctPostalCode = Arrays.stream(results)
                .filter(geocodingResult -> containsPostalCode(getFormattedPostalCode(artifact.getDistrict()), geocodingResult))
                .collect(Collectors.toList());

        if (correctPostalCode.size() == 1) {
            return createAndSaveLocation(correctPostalCode.get(0));
        } else if (correctPostalCode.size() > 1) {

            double maxDistance = 0D;

            for (int i = 0; i < correctPostalCode.size(); i++) {
                for (int j = i + 1; j < correctPostalCode.size(); j++) {
                    double calculatedDistance = distance(
                            correctPostalCode.get(i).geometry.location.lat,
                            correctPostalCode.get(j).geometry.location.lat,
                            correctPostalCode.get(i).geometry.location.lng,
                            correctPostalCode.get(j).geometry.location.lng
                    );
                    if (calculatedDistance > maxDistance)
                        maxDistance = calculatedDistance;
                }
            }

            if (maxDistance < 300D) {
                log.debug("multiple locations with correct postalcode found but all closer than 300m too each other, return the first one.");
                return createAndSaveLocation(correctPostalCode.get(0));
            }
        }
        throw new IllegalArgumentException("no correct postalcode or too many matches");
    }

    private Boolean containsPostalCode(String postalCode, GeocodingResult result) {
        return extractPostalCodeFromResult(result).equals(postalCode);
    }

    private String extractPostalCodeFromResult(GeocodingResult result) {
        return Arrays.stream(result.addressComponents)
                .filter(addressComponent -> Arrays.asList(addressComponent.types).contains(AddressComponentType.POSTAL_CODE))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("no postal code in result"))
                .longName;
    }


    private Location handleSingleResult(Artifact artifact, GeocodingResult result) throws Exception {
        String postalCode = extractPostalCodeFromResult(result);

        if (postalCode.equals(getFormattedPostalCode(artifact.getDistrict()))) {
            return createAndSaveLocation(result);
        }
        throw new Exception(artifact.getOnbImageId() + ": single result found but postal code was wrong. artifact's postal code is " + getFormattedPostalCode(artifact.getDistrict()) + " but location's is " + postalCode);
    }

    private Location createAndSaveLocation(GeocodingResult result) {
        Location location = new Location();
        location.setFormattedAddress(result.formattedAddress);
        location.setLatitude(result.geometry.location.lat);
        location.setLongitude(result.geometry.location.lng);
        return locationRepository.save(location);
    }


    private String extractAddress(Artifact artifact) {
        String title = artifact.getTitle();
        if (title.startsWith("Wien") && title.contains(",")) {
            return getFormattedDistrict(artifact.getDistrict()) + title.substring(title.indexOf(",") + 1);
        } else {
            return getFormattedDistrict(artifact.getDistrict()) + title;
        }
    }

    private String getFormattedDistrict(Integer districtNumber) {
        return getFormattedPostalCode(districtNumber) + " Wien ";
    }

    private String getFormattedPostalCode(Integer districtNumber) {
        String prefix = districtNumber < 10 ? "10" : "1";
        return prefix + districtNumber + "0";

    }

    public static double distance(double lat1, double lat2, double lon1,
                                  double lon2) {

        final int R = 6371; // Radius of the earth

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        distance = Math.pow(distance, 2);

        return Math.sqrt(distance);
    }

    public class NoResultsException extends Exception {

    }


}
