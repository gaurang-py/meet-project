import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

export default function Overview() {
  const [salesData, setSalesData] = useState([])
  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    fetchSalesData()
    fetchPredictions()
  }, [])

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/sales')
      setSalesData(response.data)
    } catch (error) {
      console.error('Error fetching sales data:', error)
    }
  }

  const fetchPredictions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/predictions')
      setPredictions(response.data)
    } catch (error) {
      console.error('Error fetching predictions:', error)
    }
  }

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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="predicted_revenue" stroke="#8884d8" />
              <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
