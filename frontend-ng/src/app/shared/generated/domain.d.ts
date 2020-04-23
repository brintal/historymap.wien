/* tslint:disable */
/* eslint-disable */

export interface Artifact extends AbstractEntity {
    onbImageId: number;
    title: string;
    description: string;
    corporateBody: string;
    year: number;
    place: string;
    address: string;
    inventoryNumber: string;
    pictureCredits: string;
    digitalCollection: string;
    additionalTitle: string;
    district: number;
    dateText: string;
    locationLastUpdated: Date;
    technique: Technique;
    authors: Person[];
    motifs: Person[];
    keywords: Keyword[];
    location: Location;
}

export interface KeywordSummary {
    text: string;
    id: number;
    size: number;
}

export interface Technique extends AbstractEntity {
    name: string;
    category: TechniqueCategory;
}

export interface Person extends AbstractEntity {
    name: string;
    firstname: string;
    lastname: string;
    dnbUrl: string;
    zettelkatalogUrl: string;
    wikipediaUrl: string;
    biographienUrl: string;
    musiklexikonUrl: string;
}

export interface Keyword {
    id: number;
    value: string;
}

export interface Location extends AbstractEntity {
    latitude: number;
    longitude: number;
    formattedAddress: string;
}

export interface AbstractEntity {
    id: number;
}

export interface TechniqueCategory extends AbstractEntity {
    name: string;
}
