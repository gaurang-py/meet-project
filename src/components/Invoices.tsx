import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Invoices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Assisted Invoice Creation</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input id="client" placeholder="Select or type client name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="Enter amount" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Type or let AI generate description" />
          </div>
          <Button>Generate Invoice with AI</Button>
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
              <TableRow>
                <TableCell>INV-001</TableCell>
                <TableCell>Acme Corp</TableCell>
                <TableCell>$1,000</TableCell>
                <TableCell>Paid</TableCell>
              </TableRow>
              <TableCell>INV-002</TableCell>
              <TableCell>Globex Inc</TableCell>
              <TableCell>$1,500</TableCell>
              <TableCell>Pending</TableCell>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}