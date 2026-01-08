// src/lib/api.ts

import { Airline, Airport, Flight, ApiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    cache: 'no-store', // Real-time data
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Airlines API
export async function getAirlines(): Promise<Airline[]> {
  const response = await fetchApi<ApiResponse<Airline[]>>('/airlines');
  return response.data;
}

export async function getAirline(id: string): Promise<Airline> {
  const response = await fetchApi<ApiResponse<Airline>>(`/airlines/${id}`);
  return response.data;
}

// Airports API
export async function getAirports(): Promise<Airport[]> {
  const response = await fetchApi<Airport[]>('/airports');
  return response.data;
}

export async function getAirport(id: string): Promise<Airport> {
  const response = await fetchApi<Airport>(`/airports/${id}`);
  return response;
}

// Flights API
export async function getFlights(): Promise<Flight[]> {
  const response = await fetchApi<ApiResponse<Flight[]>>('/flights');
  return response.data;
}

export async function getFlight(id: string): Promise<Flight> {
  const response = await fetchApi<ApiResponse<Flight>>(`/flights/${id}`);
  return response.data;
}

export async function getDepartures(airport: string = 'CGK', date?: string): Promise<Flight[]> {
  let endpoint = `/flights/departures?airport=${airport}`;
  if (date) endpoint += `&date=${date}`;
  
  const response = await fetchApi<ApiResponse<Flight[]>>(endpoint);
  return response.data;
}

export async function getArrivals(airport: string = 'CGK', date?: string): Promise<Flight[]> {
  let endpoint = `/flights/arrivals?airport=${airport}`;
  if (date) endpoint += `&date=${date}`;
  
  const response = await fetchApi<ApiResponse<Flight[]>>(endpoint);
  return response.data;
}

// Helper functions
export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    SCHEDULED: 'bg-blue-500',
    BOARDING: 'bg-yellow-500',
    DEPARTED: 'bg-green-500',
    DELAYED: 'bg-orange-500',
    CANCELLED: 'bg-red-500',
    ARRIVED: 'bg-gray-500',
  };
  return colors[status] || 'bg-gray-500';
}

export function getStatusText(status: string): string {
  const texts: Record<string, string> = {
    SCHEDULED: 'Terjadwal',
    BOARDING: 'Boarding',
    DEPARTED: 'Berangkat',
    DELAYED: 'Tertunda',
    CANCELLED: 'Dibatalkan',
    ARRIVED: 'Tiba',
  };
  return texts[status] || status;
}