// src/lib/types.ts

export interface Airline {
    id: number;
    code: string;
    name: string;
    logo_url: string | null;
    country: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
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
    created_at?: string;
    updated_at?: string;
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
    status: FlightStatus;
    remarks: string | null;
    delay_minutes: number;
    airline?: Airline;
    origin_airport?: Airport;
    destination_airport?: Airport;
    created_at?: string;
    updated_at?: string;
  }
  
  export type FlightStatus = 
    | 'SCHEDULED' 
    | 'BOARDING' 
    | 'DEPARTED' 
    | 'DELAYED' 
    | 'CANCELLED' 
    | 'ARRIVED';
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    total?: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }