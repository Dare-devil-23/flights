//airports
interface Presentation {
    title: string;
    suggestionTitle: string;
    subtitle: string;
}

interface RelevantFlightParams {
    skyId: string;
    entityId: string;
    flightPlaceType: string;
    localizedName: string;
}

interface RelevantHotelParams {
    entityId: string;
    entityType: string;
    localizedName: string;
}

interface Navigation {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: RelevantFlightParams;
    relevantHotelParams: RelevantHotelParams;
}

export interface AirportInfo {
    skyId: string;
    entityId: string;
    presentation: Presentation;
    navigation: Navigation;
}

//flights
interface Itinerary {
    id: string;
    price: {
        raw: number;
        formatted: string;
        pricingOptionId: string;
    };
    legs: Leg[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: FarePolicy;
    eco: {
        ecoContenderDelta: number;
    };
    fareAttributes: Record<string, unknown>;
    tags: string[];
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
}

interface Leg {
    id: string;
    origin: Location;
    destination: Location;
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
        marketing: Carrier[];
        operating: Carrier[];
        operationType: string;
    };
    segments: Segment[];
}

interface Location {
    id: string;
    entityId?: string;
    name: string;
    displayCode: string;
    city?: string;
    country?: string;
    isHighlighted?: boolean;
}

interface Carrier {
    id: number;
    alternateId: string;
    logoUrl: string;
    name: string;
}

interface Segment {
    id: string;
    origin: FlightPlace;
    destination: FlightPlace;
    departure: string;
    arrival: string;
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: Carrier;
    operatingCarrier: Carrier;
}

interface FlightPlace {
    flightPlaceId: string;
    displayCode: string;
    parent: {
        flightPlaceId: string;
        displayCode: string;
        name: string;
        type: string;
    };
    name: string;
    type: string;
    country: string;
}

interface FarePolicy {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
}

export interface FlightResponse {
    status: string;
    data: {
        context: {
            status: string;
            sessionId: string;
            totalResults: number;
        };
        itineraries: Itinerary[];
        messages: string[];
        filterStats: {
            duration: {
                min: number;
                max: number;
                multiCityMin: number;
                multiCityMax: number;
            };
            airports: {
                city: string;
                airports: {
                    id: string;
                    entityId: string;
                    name: string;
                }[];
            }[];
            carriers: Carrier[];
            stopPrices: {
                direct: {
                    isPresent: boolean;
                };
                one: {
                    isPresent: boolean;
                };
                twoOrMore: {
                    isPresent: boolean;
                    formattedPrice: string;
                };
            };
        };
        flightsSessionId: string;
        destinationImageUrl: string;
    };
}