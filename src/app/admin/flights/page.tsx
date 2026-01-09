// src/app/admin/flights/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getFlights, getAirlines, getAirports } from '@/lib/api';
import { createFlight, updateFlight, deleteFlight } from '@/lib/admin-api';
import { Flight, Airline, Airport } from '@/types';
import StatusBadge from '@/components/StatusBadge';

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [formData, setFormData] = useState({
    airline_id: '',
    flight_number: '',
    origin_airport_id: '',
    destination_airport_id: '',
    scheduled_departure: '',
    scheduled_arrival: '',
    gate: '',
    terminal: '',
    status: 'SCHEDULED',
    remarks: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [flightsData, airlinesData, airportsData] = await Promise.all([
        getFlights(),
        getAirlines(),
        getAirports(),
      ]);
      setFlights(flightsData);
      setAirlines(airlinesData);
      setAirports(airportsData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.origin_airport_id === formData.destination_airport_id) {
      alert('Bandara asal dan tujuan harus berbeda!');
      return;
    }

    try {
      const submitData = {
        ...formData,
        airline_id: parseInt(formData.airline_id),
        origin_airport_id: parseInt(formData.origin_airport_id),
        destination_airport_id: parseInt(formData.destination_airport_id),
        gate: formData.gate || null,
        terminal: formData.terminal || null,
        remarks: formData.remarks || null,
      };

      if (editingFlight) {
        await updateFlight(editingFlight.id, submitData);
        alert('Penerbangan berhasil diupdate!');
      } else {
        await createFlight(submitData);
        alert('Penerbangan berhasil ditambahkan!');
      }
      resetForm();
      loadData();
    } catch (error: any) {
      console.error('Error saving flight:', error);
      alert(error.message || 'Gagal menyimpan data penerbangan');
    }
  };

  const handleEdit = (flight: Flight) => {
    setEditingFlight(flight);
    setFormData({
      airline_id: String(flight.airline_id),
      flight_number: flight.flight_number,
      origin_airport_id: String(flight.origin_airport_id),
      destination_airport_id: String(flight.destination_airport_id),
      scheduled_departure: flight.scheduled_departure.slice(0, 16),
      scheduled_arrival: flight.scheduled_arrival.slice(0, 16),
      gate: flight.gate || '',
      terminal: flight.terminal || '',
      status: flight.status,
      remarks: flight.remarks || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus penerbangan ini?')) return;
    
    try {
      await deleteFlight(id);
      alert('Penerbangan berhasil dihapus!');
      loadData();
    } catch (error) {
      console.error('Error deleting flight:', error);
      alert('Gagal menghapus penerbangan');
    }
  };

  const resetForm = () => {
    setFormData({
      airline_id: '',
      flight_number: '',
      origin_airport_id: '',
      destination_airport_id: '',
      scheduled_departure: '',
      scheduled_arrival: '',
      gate: '',
      terminal: '',
      status: 'SCHEDULED',
      remarks: '',
    });
    setEditingFlight(null);
    setShowForm(false);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Kelola Penerbangan
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Tambah, edit, atau hapus jadwal penerbangan
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <span className="text-xl">{showForm ? '✕' : '➕'}</span>
            <span>{showForm ? 'Tutup' : 'Tambah Penerbangan'}</span>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingFlight ? 'Edit Penerbangan' : 'Tambah Penerbangan Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maskapai *
                  </label>
                  <select
                    required
                    value={formData.airline_id}
                    onChange={(e) => setFormData({ ...formData, airline_id: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih Maskapai</option>
                    {airlines.map((airline) => (
                      <option key={airline.id} value={airline.id}>
                        {airline.code} - {airline.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nomor Penerbangan *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.flight_number}
                    onChange={(e) => setFormData({ ...formData, flight_number: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                    placeholder="GA-123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bandara Asal *
                  </label>
                  <select
                    required
                    value={formData.origin_airport_id}
                    onChange={(e) => setFormData({ ...formData, origin_airport_id: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih Bandara</option>
                    {airports.map((airport) => (
                      <option key={airport.id} value={airport.id}>
                        {airport.code} - {airport.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bandara Tujuan *
                  </label>
                  <select
                    required
                    value={formData.destination_airport_id}
                    onChange={(e) => setFormData({ ...formData, destination_airport_id: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih Bandara</option>
                    {airports.map((airport) => (
                      <option key={airport.id} value={airport.id}>
                        {airport.code} - {airport.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Jadwal Keberangkatan *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.scheduled_departure}
                    onChange={(e) => setFormData({ ...formData, scheduled_departure: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Jadwal Kedatangan *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.scheduled_arrival}
                    onChange={(e) => setFormData({ ...formData, scheduled_arrival: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Terminal
                  </label>
                  <input
                    type="text"
                    value={formData.terminal}
                    onChange={(e) => setFormData({ ...formData, terminal: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                    placeholder="1A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gate
                  </label>
                  <input
                    type="text"
                    value={formData.gate}
                    onChange={(e) => setFormData({ ...formData, gate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                    placeholder="A1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                  >
                    <option value="SCHEDULED">Terjadwal</option>
                    <option value="BOARDING">Boarding</option>
                    <option value="DEPARTED">Berangkat</option>
                    <option value="DELAYED">Tertunda</option>
                    <option value="CANCELLED">Dibatalkan</option>
                    <option value="ARRIVED">Tiba</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Catatan
                  </label>
                  <textarea
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                    placeholder="Catatan tambahan..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  {editingFlight ? '💾 Update' : '➕ Tambah'}
                </button>
                {editingFlight && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-zinc-700 transition-all"
                  >
                    ✕ Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* List */}
        <div className="grid gap-6">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">
                    ✈️
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {flight.flight_number}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {flight.airline?.name}
                    </p>
                  </div>
                </div>
                <StatusBadge status={flight.status} />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Keberangkatan</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {flight.origin_airport?.code} - {flight.origin_airport?.city}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDateTime(flight.scheduled_departure)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Kedatangan</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {flight.destination_airport?.code} - {flight.destination_airport?.city}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDateTime(flight.scheduled_arrival)}
                  </p>
                </div>
              </div>

              {(flight.terminal || flight.gate) && (
                <div className="flex gap-3 mb-4">
                  {flight.terminal && (
                    <span className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                      🏢 Terminal {flight.terminal}
                    </span>
                  )}
                  {flight.gate && (
                    <span className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                      🚪 Gate {flight.gate}
                    </span>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(flight)}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(flight.id)}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}