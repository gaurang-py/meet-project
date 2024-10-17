import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Clients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" placeholder="Enter client name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input id="clientEmail" type="email" placeholder="Enter client email" />
            </div>
          </div>
          <Button>Add Client</Button>
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
              <TableRow>
                <TableCell>Acme Corp</TableCell>
                <TableCell>contact@acme.com</TableCell>
                <TableCell>5</TableCell>
                <TableCell>High-value client</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Globex Inc</TableCell>
                <TableCell>info@globex.com</TableCell>
                <TableCell>3</TableCell>
                <TableCell>Potential for upselling</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}