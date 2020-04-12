export interface Properties {
    place_id: number;
    osm_type: string;
    osm_id: number;
    display_name: string;
    place_rank: number;
    category: string;
    type: string;
    importance: number;
    icon: string;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Feature {
    type: string;
    properties: Properties;
    bbox: number[];
    geometry: Geometry;
}

export interface RootObject {
    type: string;
    licence: string;
    features: Feature[];
}

