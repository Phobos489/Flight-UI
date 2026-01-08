import { Airline, Airport, Flight, ApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getFlights(): Promise<Flight[]> {
  const data = await fetchApi<ApiResponse<Flight[]>>('/flights');
  return data.data || [];
}

export async function getAirlines(): Promise<Airline[]> {
  const data = await fetchApi<ApiResponse<Airline[]>>('/airlines');
  return data.data || [];
}

export async function getAirports(): Promise<Airport[]> {
  const data = await fetchApi<any>('/airports');
  // Airport API returns paginated data
  return data.data || [];
}

export async function getFlight(id: string): Promise<Flight> {
  const data = await fetchApi<ApiResponse<Flight>>(`/flights/${id}`);
  return data.data;
}

export async function getAirline(id: string): Promise<Airline> {
  const data = await fetchApi<ApiResponse<Airline>>(`/airlines/${id}`);
  return data.data;
}

export async function getAirport(id: string): Promise<Airport> {
  const data = await fetchApi<Airport>(`/airports/${id}`);
  return data;
}