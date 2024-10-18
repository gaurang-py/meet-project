import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from 'axios'

export default function Clients() {
  interface Client {
    id: number;
    name: string;
    email: string;
    total_invoices: number;
    ai_insights: string;
  }

  const [clients, setClients] = useState<Client[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    const response = await axios.get('http://127.0.0.1:5000/clients')
    setClients(response.data)
  }

interface AddClientEvent extends React.FormEvent<HTMLFormElement> {}

const addClient = async (e: AddClientEvent): Promise<void> => {
    e.preventDefault()
    try {
        await axios.post('http://127.0.0.1:5000/clients', { name, email })
        fetchClients()  // Refresh the client list
        setName("")
        setEmail("")
    } catch (error) {
        console.error(error)
        alert("Error adding client")
    }
}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 mb-8" onSubmit={addClient}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter client email"
              />
            </div>
          </div>
          <Button type="submit">Add Client</Button>
        </form>

        <div>
          <h3 className="text-lg font-semibold mb-4">Client List</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Invoices</TableHead>
                <TableHead>AI Insights</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.total_invoices}</TableCell>
                  <TableCell>{client.ai_insights}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
