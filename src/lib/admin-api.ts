// src/lib/admin-api.ts
import { Airline, Airport, Flight } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `API Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Airlines
export async function createAirline(data: Partial<Airline>) {
  return fetchApi('/airlines', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAirline(id: number, data: Partial<Airline>) {
  return fetchApi(`/airlines/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAirline(id: number) {
  return fetchApi(`/airlines/${id}`, {
    method: 'DELETE',
  });
}

// Airports
export async function createAirport(data: Partial<Airport>) {
  return fetchApi('/airports', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAirport(id: number, data: Partial<Airport>) {
  return fetchApi(`/airports/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAirport(id: number) {
  return fetchApi(`/airports/${id}`, {
    method: 'DELETE',
  });
}

// Flights
export async function createFlight(data: Partial<Flight>) {
  return fetchApi('/flights', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateFlight(id: number, data: Partial<Flight>) {
  return fetchApi(`/flights/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteFlight(id: number) {
  return fetchApi(`/flights/${id}`, {
    method: 'DELETE',
  });
}

export async function updateFlightStatus(
  id: number,
  status: string,
  remarks?: string
) {
  return fetchApi(`/flights/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, remarks }),
  });
}