import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Invoices() {
  const [clients, setClients] = useState<{ id: number; name: string }[]>([])
  const [invoices, setInvoices] = useState<{ id: number; client: string; amount: number; status: string }[]>([])
  const [selectedClientId, setSelectedClientId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetchClients()
    fetchInvoices()
  }, [])

  // Fetch clients from the backend
  const fetchClients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/clients')
      setClients(response.data)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  // Fetch invoices from the backend
  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/invoices')
      setInvoices(response.data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    }
  }

  // Handle invoice submission
  const handleGenerateInvoice = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await axios.post('http://127.0.0.1:5000/invoices', {
        client_id: selectedClientId,
        amount: parseFloat(amount),
        description,
      })
      fetchInvoices()  // Refresh the list of invoices
      setSelectedClientId('')
      setAmount('')
      setDescription('')
    } catch (error) {
      console.error('Error generating invoice:', error)
      alert('Error generating invoice')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Assisted Invoice Creation</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleGenerateInvoice}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <select
                id="client"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="border rounded p-2 w-full"
                required
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type or let AI generate description"
            />
          </div>
          <Button type="submit">Generate Invoice with AI</Button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
