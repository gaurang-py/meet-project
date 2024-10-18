import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

export default function Sales() {
  const [salesData, setSalesData] = useState([])
  const [predictions, setPredictions] = useState([])
  const [insights, setInsights] = useState([])

  // Fetch data from backend when component mounts
  useEffect(() => {
    fetchSalesData()
    fetchPredictions()
    fetchInsights()
  }, [])

  // Fetch sales data from Flask API
  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/sales')
      setSalesData(response.data)
    } catch (error) {
      console.error('Error fetching sales data:', error)
    }
  }

  // Fetch AI predictions from Flask API
  const fetchPredictions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/predictions')
      setPredictions(response.data)
    } catch (error) {
      console.error('Error fetching predictions:', error)
    }
  }

  // Fetch AI insights from Flask API
  const fetchInsights = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/insights')
      setInsights(response.data)
    } catch (error) {
      console.error('Error fetching insights:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Historical Sales Data */}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
              <Line type="monotone" dataKey="profit" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>

          {/* Chart 2: AI Predictions */}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={predictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="predicted_revenue" stroke="#82ca9d" />
              <Line type="monotone" dataKey="profit" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">AI-Generated Insights</h3>
          <ul className="list-disc pl-5 space-y-2">
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
