// src/app/admin/airlines/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getAirlines } from '@/lib/api';
import { createAirlineWithUpload, updateAirlineWithUpload, deleteAirline } from '@/lib/admin-api';
import { Airline } from '@/types';
import Image from 'next/image';

export default function AdminAirlinesPage() {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAirline, setEditingAirline] = useState<Airline | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    logo_url: '',
    country: 'Indonesia',
    is_active: true,
  });

  useEffect(() => {
    loadAirlines();
  }, []);

  const loadAirlines = async () => {
    try {
      const data = await getAirlines();
      setAirlines(data);
    } catch (error) {
      console.error('Error loading airlines:', error);
      alert('Gagal memuat data maskapai');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi ukuran file (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 2MB');
        return;
      }

      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }

      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('code', formData.code);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('is_active', formData.is_active ? '1' : '0');

      // If logo file is selected, add it
      if (logoFile) {
        formDataToSend.append('logo', logoFile);
      } else if (formData.logo_url) {
        formDataToSend.append('logo_url', formData.logo_url);
      }

      if (editingAirline) {
        await updateAirlineWithUpload(editingAirline.id, formDataToSend);
        alert('Maskapai berhasil diupdate!');
      } else {
        await createAirlineWithUpload(formDataToSend);
        alert('Maskapai berhasil ditambahkan!');
      }
      resetForm();
      loadAirlines();
    } catch (error) {
      console.error('Error saving airline:', error);
      alert('Gagal menyimpan data maskapai');
    }
  };

  const handleEdit = (airline: Airline) => {
    setEditingAirline(airline);
    setFormData({
      code: airline.code,
      name: airline.name,
      logo_url: airline.logo_url || '',
      country: airline.country,
      is_active: airline.is_active,
    });
    setLogoPreview(airline.logo_url || null);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus maskapai ini?')) return;
    
    try {
      await deleteAirline(id);
      alert('Maskapai berhasil dihapus!');
      loadAirlines();
    } catch (error) {
      console.error('Error deleting airline:', error);
      alert('Gagal menghapus maskapai');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      logo_url: '',
      country: 'Indonesia',
      is_active: true,
    });
    setLogoFile(null);
    setLogoPreview(null);
    setEditingAirline(null);
    setShowForm(false);
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
              Kelola Maskapai
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Tambah, edit, atau hapus maskapai penerbangan
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <span className="text-xl">{showForm ? '✕' : '➕'}</span>
            <span>{showForm ? 'Tutup' : 'Tambah Maskapai'}</span>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingAirline ? 'Edit Maskapai' : 'Tambah Maskapai Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kode Maskapai *
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="GA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Maskapai *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Garuda Indonesia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Negara
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Indonesia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Format: JPG, PNG, GIF. Max: 2MB
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Atau URL Logo (opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/logo.png"
                    disabled={!!logoFile}
                  />
                </div>
              </div>

              {/* Logo Preview */}
              {logoPreview && (
                <div className="rounded-lg border border-gray-200 dark:border-zinc-700 p-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preview Logo:
                  </p>
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status Aktif
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  {editingAirline ? '💾 Update' : '➕ Tambah'}
                </button>
                {editingAirline && (
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
        <div className="grid gap-4">
          {airlines.map((airline) => (
            <div
              key={airline.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Logo or Code Badge */}
                  {airline.logo_url ? (
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 shadow-lg">
                      <Image
                        src={airline.logo_url}
                        alt={airline.name}
                        fill
                        className="object-contain p-2"
                        unoptimized={airline.logo_url.includes('localhost')}
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-2xl font-black text-white shadow-lg">
                      {airline.code}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {airline.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {airline.country}
                    </p>
                    {airline.is_active ? (
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-xs font-semibold text-green-700 dark:text-green-400">
                        ● Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-900/30 text-xs font-semibold text-gray-700 dark:text-gray-400">
                        ● Inactive
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(airline)}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(airline.id)}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}