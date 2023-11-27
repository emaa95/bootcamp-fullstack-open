export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }

export interface Flight {
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export interface ContentProps {
    flightParts: Flight[];
}

export interface FlightProps {
    flight: Flight;
}
