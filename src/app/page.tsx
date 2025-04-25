"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
//import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
//import MapClient from "../components/MapClient";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("../components/MapClient"), { ssr: false });
//import dynamic from "next/dynamic";


const tabs = ["Dashboard", "Products", "Sales"];


const productData = [
  { name: "June 1", value: 1200 },
  { name: "June 7", value: 1900 },
  { name: "June 14", value: 800 },
  { name: "June 21", value: 3000 },
  { name: "June 28", value: 2100 },
];

const clients = [
  { name: "Cafe Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417 },
  { name: "Espresso Roma", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { name: "Coffee Corner", country: "Germany", lat: 52.52, lng: 13.405 },
  { name: "Latte Love", country: "USA", lat: 40.7128, lng: -74.006 },
  { name: "Brew Bros", country: "UK", lat: 51.5074, lng: -0.1278 },
  { name: "Kafe Kyiv", country: "Ukraine", lat: 50.4501, lng: 30.5234 },
  { name: "Bean Scene", country: "Canada", lat: 45.4215, lng: -75.6972 },
  { name: "Flat White", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Café Rio", country: "Brazil", lat: -22.9068, lng: -43.1729 },
  { name: "Vienna Roast", country: "Austria", lat: 48.2082, lng: 16.3738 },
];

const orders = [
  { id: 1, client: "Cafe Zurich", status: "New" },
  { id: 2, client: "Espresso Roma", status: "In Progress" },
  { id: 3, client: "Coffee Corner", status: "Shipped" },
  { id: 4, client: "Latte Love", status: "Blocked" },
  { id: 5, client: "Brew Bros", status: "Done" },
  { id: 6, client: "Kafe Kyiv", status: "New" },
  { id: 7, client: "Bean Scene", status: "In Progress" },
  { id: 8, client: "Flat White", status: "Shipped" },
  { id: 9, client: "Café Rio", status: "Blocked" },
  { id: 10, client: "Vienna Roast", status: "Done" },
];


export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (key: string) => {
    setSelectedFeatures(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const featureOptions = [
    { name: "Coffee", key: "coffee" },
    { name: "Hot water", key: "hotWater" },
    { name: "Tea", key: "tea" },
    { name: "Milk products", key: "milkProducts" },
    { name: "Cold milk products", key: "coldMilk" },
    { name: "2 milk alternatives", key: "twoMilk" },
    { name: "More than 2 milk alternatives", key: "multiMilk" },
    { name: "Steam", key: "steam" },
    { name: "Powder", key: "powder" },
    { name: "Flavour", key: "flavour" },
  ];

  const machines = [
    {
      model: "Black&White4",
      image: "/machines/bw4.jpg",
      features: ["coffee", "hotWater", "steam"]
    },
    {
      model: "Black&White4c",
      image: "/machines/bw4c.jpg",
      features: ["coffee", "milkProducts", "coldMilk", "steam"]
    },
    {
      model: "CTM Classic",
      image: "/machines/ctm.jpg",
      features: ["coffee", "powder", "flavour", "steam"]
    },
    {
      model: "BW4-Twin Milk",
      image: "/machines/bw4-twin.jpg",
      features: ["coffee", "twoMilk", "milkProducts", "steam"]
    },
    {
      model: "BW4-MultiMilk",
      image: "/machines/bw4-multi.jpg",
      features: ["coffee", "multiMilk", "coldMilk", "flavour", "steam"]
    }
  ];

  const bestMatch = machines
    .map(machine => ({
      ...machine,
      matchCount: selectedFeatures.filter(f => machine.features.includes(f)).length
    }))
    .sort((a, b) => b.matchCount - a.matchCount)[0];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-gray-100 p-4">
        <Image src="/logo.jpg" alt="Thermoplan" width={120} height={30} className="mb-6" />
        <div className="space-y-2">
          <button className="block text-left w-full px-2 py-1 text-sm font-medium text-gray-800">Products</button>
          <button className="block text-left w-full px-2 py-1 text-sm font-medium text-gray-800">Machine Health</button>
          <button className="block text-left w-full px-2 py-1 text-sm font-medium text-gray-800">Services Machines</button>
          <button className="block text-left w-full px-2 py-1 text-sm font-medium text-gray-800">Services Water Filters</button>
          <button className="block text-left w-full px-2 py-1 text-sm font-medium text-gray-800">Consumption - Coffee</button>
          <button className="block text-left w-full px-2 py-1 text-sm font-medium text-gray-800">Remote Update</button>
          <button className="block text-left w-full px-2 py-1 text-sm font-medium text-gray-800">Message Center</button>
          <button className="block text-left w-full px-2 py-1 text-sm font-medium text-gray-800">Content Management</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        {/* Top Tabs */}
        <div className="flex space-x-6 mb-6 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-semibold ${activeTab === tab ? "text-black border-b-2 border-black" : "text-gray-500"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Dashboard" && (
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent>
                <h2 className="font-bold text-xl">Machines</h2>
                <p>137 total machines</p>
                <p>20 connected</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="font-bold text-xl">Product Count</h2>
                <p>563 Today</p>
                <p>1,359 Yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="font-bold text-xl">Milk Products</h2>
                <p>12,286 last month</p>
                <p>+280% YoY</p>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardContent>
                <h2 className="font-bold text-xl mb-2">Product Activity</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={productData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="font-bold text-xl mb-2">Map of Machines</h2>
                <MapClient
    center={[47.0305, 8.4262]}
    zoom={13}
    height="192px"
    markers={[{ lat: 47.0305, lng: 8.4262, label: "Thermoplan HQ" }]}
  />
              </CardContent>
            </Card>
          </div>
        )}


        {activeTab === "Products" && (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Configure Your Coffee Machine</h2>

    <div className="grid grid-cols-2 gap-4 mb-6">
      {featureOptions.map(opt => (
        <button
          key={opt.key}
          onClick={() => toggleFeature(opt.key)}
          className={`px-4 py-2 border rounded-full text-sm ${
            selectedFeatures.includes(opt.key)
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {opt.name}
        </button>
      ))}
    </div>

    <div className="flex items-center gap-6">
      <div className="w-1/2 rounded-lg overflow-hidden border shadow-md">
        <Image
          src={bestMatch?.image || "/machines/default.jpg"}
          alt={bestMatch?.model || "Machine"}
          width={600}
          height={400}
          className="object-contain w-full h-auto"
        />
      </div>
      <div className="w-1/2">
        <h3 className="text-xl font-semibold mb-2">Suggested Model</h3>
        <p className="text-gray-800 text-lg mb-4">
          {bestMatch?.model || "Please select features to get a recommendation."}
        </p>
        <ul className="list-disc ml-5">
          {bestMatch?.features.map((f, i) => (
            <li key={i} className="capitalize text-gray-600">
              {featureOptions.find(opt => opt.key === f)?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}


        {activeTab === "Sales" && (

          <div className="p-6">
            <Card className="mb-6">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Order Statuses</h2>
                <table className="min-w-full text-sm text-left">
                  <thead className="border-b">
                    <tr>
                      <th className="py-2 px-4">Order ID</th>
                      <th className="py-2 px-4">Client</th>
                      <th className="py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-2 px-4">{order.id}</td>
                        <td className="py-2 px-4">{order.client}</td>
                        <td className="py-2 px-4">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
              <h2 className="text-xl font-semibold mb-4">Client Locations</h2>
<div className="h-[500px] w-full rounded-2xl overflow-hidden border shadow">
<MapClient
          center={[20, 0]}
          zoom={2}
          height="100%"
          markers={clients.map((client) => ({
            lat: client.lat,
            lng: client.lng,
            label: `${client.name} - ${client.country}`,
          }))}
        />


</div>

              </CardContent>
            </Card>
          </div>

        )}
      </div>
    </div>
  );
}
