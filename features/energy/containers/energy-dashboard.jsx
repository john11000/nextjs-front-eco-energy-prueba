"use client";

import { useState } from "react";
import { Button } from "../components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { ScrollArea } from "../components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Zap, Battery, Sun, DollarSign } from "lucide-react";
import useGetStatisticsClient from "../hooks/useGetStaticticClient";

const COLORS = {
  consumption: "#ff4757",
  injection: "#2ed573",
  ea: "#5352ed",
  ec: "#ffa502",
  ee1: "#ff6b6b",
  ee2: "#ff6b6b",
};

export function EnergyDashboard() {
  const [clientStatistics, setClientStatistics] = useState(null);
  const [systemLoad, setSystemLoad] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const { getStaticsClient } = useGetStatisticsClient();
  const getClientStatistics = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const clientId = formData.get("clientId");
    const stast = await getStaticsClient(clientId);
    console.log(stast);
    setClientStatistics(stast);
  };

  const getSystemLoad = async () => {
    setSystemLoad(
      Array(24)
        .fill(null)
        .map((_, i) => ({
          timestamp: `2024-01-19T${String(i).padStart(2, "0")}:00:00`,
          load: Math.floor(Math.random() * 100) + 1,
        }))
    );
  };

  const calculateInvoice = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const clientId = formData.get("clientId");
    const month = formData.get("month");
    const concept = formData.get("concept");
    const stast = await getStaticsClient(clientId);
    console.log(stast);
    // Simulating API call with mock data
    setInvoice(stast);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8  w-full">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
        Energy Dashboard
      </h1>
      <Tabs defaultValue="client-stats" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 bg-gray-900">
          <TabsTrigger value="client-stats" className="text-white">
            <Zap className="mr-2" />
            Client Statistics
          </TabsTrigger>
          <TabsTrigger value="system-load" className="text-white">
            <Battery className="mr-2" />
            System Load
          </TabsTrigger>
          <TabsTrigger value="invoice" className="text-white">
            <DollarSign className="mr-2" />
            Calculate Invoice
          </TabsTrigger>
        </TabsList>
        <TabsContent value="client-stats">
          <Card className="bg-gray-900 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Zap className="mr-2" />
                Client Statistics
              </CardTitle>
              <CardDescription className="text-gray-400">
                Get statistics for a specific client.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={getClientStatistics} className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="clientId" className="text-gray-300">
                    Client ID
                  </Label>
                  <Input
                    id="clientId"
                    name="clientId"
                    placeholder="Enter client ID"
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Get Statistics
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              {clientStatistics && (
                <div className="w-full space-y-6">
                  <h3 className="text-2xl font-semibold text-green-400">
                    Energy Data for Client {clientStatistics.client_id}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gray-800">
                      <CardHeader>
                        <CardTitle className="text-red-400 flex items-center">
                          <Battery className="mr-2" />
                          Consumption
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Total:{" "}
                          {
                            clientStatistics.results[0].consumption
                              .total_consumption
                          }{" "}
                          kWh
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart
                            data={
                              clientStatistics.results[0].consumption.details
                            }
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#444"
                            />
                            <XAxis dataKey="record_timestamp" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#333",
                                border: "none",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke={COLORS.consumption}
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Sun className="mr-2" />
                          Injection
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Total:{" "}
                          {
                            clientStatistics.results[0].injection
                              .total_injection
                          }{" "}
                          kWh
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart
                            data={clientStatistics.results[0].injection.details}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#444"
                            />
                            <XAxis dataKey="record_timestamp" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#333",
                                border: "none",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke={COLORS.injection}
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-blue-400">
                        Consumption vs Injection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={[
                            {
                              name: "Consumption",
                              value:
                                clientStatistics.results[0].consumption
                                  .total_consumption,
                            },
                            {
                              name: "Injection",
                              value:
                                clientStatistics.results[0].injection
                                  .total_injection,
                            },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="name" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#333",
                              border: "none",
                            }}
                          />
                          <Bar dataKey="value">
                            {[COLORS.consumption, COLORS.injection].map(
                              (color, index) => (
                                <Cell key={`cell-${index}`} fill={color} />
                              )
                            )}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="system-load">
          <Card className="bg-gray-900 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Battery className="mr-2" />
                System Load
              </CardTitle>
              <CardDescription className="text-gray-400">
                Get the system load based on consumption data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={getSystemLoad}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Get System Load
              </Button>
            </CardContent>
            <CardFooter>
              {systemLoad && (
                <div className="w-full space-y-6">
                  <h3 className="text-2xl font-semibold text-green-400">
                    System Load Over Time
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={systemLoad}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="timestamp" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#333",
                          border: "none",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="load"
                        stroke="#10b981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="invoice">
          <Card className="bg-gray-900 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <DollarSign className="mr-2" />
                Calculate Invoice
              </CardTitle>
              <CardDescription className="text-gray-400">
                Calculate the invoice for a specific client, month, and concept.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateInvoice} className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="clientId" className="text-gray-300">
                    Client ID
                  </Label>
                  <Input
                    id="clientId"
                    name="clientId"
                    placeholder="Enter client ID"
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="month" className="text-gray-300">
                    Month
                  </Label>
                  <Input
                    id="month"
                    name="month"
                    placeholder="Enter month (YYYYMM)"
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="concept" className="text-gray-300">
                    Concept
                  </Label>
                  <Select name="concept">
                    <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                      <SelectValue placeholder="Select concept" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EA">Energía Activa (EA)</SelectItem>
                      <SelectItem value="EC">
                        Comercialización de Excedentes de Energía (EC)
                      </SelectItem>
                      <SelectItem value="EE1">
                        Excedentes de Energía tipo 1 (EE1)
                      </SelectItem>
                      <SelectItem value="EE2">
                        Excedentes de Energía tipo 2 (EE2)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Calculate
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              {invoice && (
                <div className="w-full space-y-6">
                  <h3 className="text-2xl font-semibold text-green-400">
                    Invoice for Client {invoice.client_id}
                  </h3>
                  <ScrollArea className="h-[300px] w-full rounded-md border border-gray-700 p-4">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          <th className="pb-2 text-green-400">Concept</th>
                          <th className="pb-2 text-green-400">Sum</th>
                          <th className="pb-2 text-green-400">Rate</th>
                          <th className="pb-2 text-green-400">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(invoice.invoice[0]).map(
                          ([key, item]) => (
                            <tr key={key} className="border-t border-gray-700">
                              <td className="py-2">{item.concept}</td>
                              <td className="py-2">{item.sum}</td>
                              <td className="py-2">
                                {item.CU ||
                                  item.C ||
                                  item["-CU"]?.toFixed(2) ||
                                  "-"}
                              </td>
                              <td className="py-2">{item.value.toFixed(2)}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </ScrollArea>
                  <Card className="bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-blue-400">
                        Invoice Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={Object.entries(invoice.invoice[0]).map(
                              ([key, item]) => ({
                                name: item.concept,
                                value: Math.abs(item.value),
                              })
                            )}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {Object.entries(invoice.invoice[0]).map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[entry[0].toLowerCase()]}
                                />
                              )
                            )}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#333",
                              border: "none",
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
