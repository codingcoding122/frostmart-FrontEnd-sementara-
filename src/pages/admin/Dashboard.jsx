import React from 'react';
import { FiTrendingUp, FiShoppingBag, FiEye } from 'react-icons/fi'; // Mengganti FiDollarSign ke FiTrendingUp
import { Bar } from 'react-chartjs-2';
import { formatRupiah } from '../../utils/formatCurrency'; // Baris Baru: Import helper rupiah (sesuaikan jika path berbeda)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 1. Wajib register komponen Chart.js biar bisa dipakai
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock Data untuk Diagram/Chart
const dataAnalisis = [
  { tanggal: '1 Jun', order: 12, revenue: 1500000 },
  { tanggal: '2 Jun', order: 19, revenue: 2300000 },
  { tanggal: '3 Jun', order: 15, revenue: 1800000 },
  { tanggal: '4 Jun', order: 22, revenue: 2900000 },
  { tanggal: '5 Jun', order: 30, revenue: 4100000 },
];

// 2. Setup Data Format khusus untuk Chart.js
const chartData = {
  labels: dataAnalisis.map((item) => item.tanggal),
  datasets: [
    {
      label: 'Total Pesanan', // Diubah dari 'Total Orders'
      data: dataAnalisis.map((item) => item.order),
      backgroundColor: '#1c54ff', 
      borderRadius: 4, 
      barPercentage: 0.4, 
    },
  ],
};

// 3. Setup Options biar tampilan grafiknya clean & aesthetic
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, 
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#0f172a',
      bodyColor: '#64748b',
      borderColor: '#f1f5f9',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: function(context) {
          return `${context.raw} Pesanan`; // Diubah dari 'Orders'
        }
      }
    },
  },
  scales: {
    x: {
      grid: {
        display: false, 
        drawBorder: false,
      },
      ticks: {
        color: '#64748b',
        font: { size: 12 },
      },
    },
    y: {
      grid: {
        color: '#f1f5f9',
        drawBorder: false,
        tickLength: 0,
      },
      border: {
        dash: [4, 4], 
      },
      ticks: {
        color: '#64748b',
        font: { size: 12 },
        padding: 10,
      },
    },
  },
};

export default function Dashboard() {
  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Selamat datang kembali, Admin.</p> {/* Diubah dari Bahasa Inggris */}
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-semibold text-gray-500">Total Pendapatan</p> {/* Diubah dari 'Total Revenue' */}
            <div className="p-2 bg-blue-50 text-[#1c54ff] rounded-lg"><FiTrendingUp size={20} /></div> {/* Mengganti icon dolar */}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{formatRupiah(2632775)}</h2> {/* Diubah menggunakan fungsi formatRupiah */}
          <p className="text-xs text-green-500 font-medium mt-2">+10.8% vs bulan lalu</p> {/* Diubah dari 'last month' */}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-semibold text-gray-500">Total Pesanan per Bulan</p> {/* Diubah dari 'Total Orders per Month' */}
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><FiShoppingBag size={20} /></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">184</h2>
          <p className="text-xs text-green-500 font-medium mt-2">+5.0% vs bulan lalu</p> {/* Diubah dari 'last month' */}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-semibold text-gray-500">Kunjungan Halaman</p> {/* Diubah dari 'Page Views' */}
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><FiEye size={20} /></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">27.922</h2>
          <p className="text-xs text-green-500 font-medium mt-2">+22.7% vs bulan lalu</p> {/* Diubah dari 'last month' */}
        </div>
      </div>

      {/* CHART / DIAGRAM ANALISIS */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Ringkasan Bulanan</h2> {/* Diubah dari 'Monthly Overview' */}
          <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none font-medium">
            <option>Minggu Ini</option> {/* Diubah dari 'This Week' */}
            <option>Bulan Ini</option> {/* Diubah dari 'This Month' */}
            <option>Tahun Ini</option> {/* Diubah dari 'This Year' */}
          </select>
        </div>
        
        {/* Render Chart.js */}
        <div className="h-72 w-full relative">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}