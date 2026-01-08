export interface Airline {
    id: number;
    code: string;
    name: string;
    logo_url: string | null;
    country: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    full_name?: string;
  }
  
  export interface Airport {
    id: number;
    code: string;
    name: string;
    city: string;
    country: string;
    timezone: string;
    latitude: number | null;
    longitude: number | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    full_name?: string;
    departing_flights_count?: number;
    arriving_flights_count?: number;
  }
  
  export interface Flight {
    id: number;
    airline_id: number;
    flight_number: string;
    origin_airport_id: number;
    destination_airport_id: number;
    scheduled_departure: string;
    scheduled_arrival: string;
    actual_departure: string | null;
    actual_arrival: string | null;
    gate: string | null;
    terminal: string | null;
    status: 'SCHEDULED' | 'BOARDING' | 'DEPARTED' | 'DELAYED' | 'CANCELLED' | 'ARRIVED';
    remarks: string | null;
    delay_minutes: number;
    created_at: string;
    updated_at: string;
    airline?: Airline;
    origin_airport?: Airport;
    destination_airport?: Airport;
    is_delayed?: boolean;
    formatted_departure_time?: string;
    formatted_arrival_time?: string;
    flight_duration?: number;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    total?: number;
    message?: string;
  }