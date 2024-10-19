import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import axios from 'axios';

export default function Overview() {
  const [salesData, setSalesData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchSalesData();
    fetchPredictions();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/sales');
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const fetchPredictions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/predictions');
      setPredictions(response.data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Graph 1: Sales Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
              <XAxis dataKey="month" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", borderColor: "#ccc" }} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#f44336" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#ff9800" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Graph 2: AI Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>AI Revenue Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictions}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
              <XAxis dataKey="month" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", borderColor: "#ccc" }} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="predicted_revenue" stroke="#2196f3" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#8bc34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
