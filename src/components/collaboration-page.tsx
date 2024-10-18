'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from 'lucide-react'

// Collaborator Management Component
export function CollaborationPageComponent() {
  interface Collaborator {
    id: number;
    name: string;
    email: string;
    avatar: string;
  }

  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    fetchCollaborators()
  }, [])

  // Fetch all collaborators from the API
  const fetchCollaborators = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/collaborators')
      setCollaborators(response.data)
    } catch (error) {
      console.error('Error fetching collaborators:', error)
    }
  }

  // Add a new collaborator
  const handleAddCollaborator = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const name = newCollaboratorEmail.split('@')[0]  // Simple name generation
      const avatar = `/placeholder-avatar-${collaborators.length + 1}.jpg`
      await axios.post('http://127.0.0.1:5000/collaborators', { name, email: newCollaboratorEmail, avatar })
      fetchCollaborators()  // Refresh the list
      setNewCollaboratorEmail('')
      setIsAddModalOpen(false)
    } catch (error) {
      console.error('Error adding collaborator:', error)
      alert('Error adding collaborator')
    }
  }

  // Remove a collaborator
  const handleRemoveCollaborator = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/collaborators/${id}`)
      fetchCollaborators()  // Refresh the list
    } catch (error) {
      console.error('Error removing collaborator:', error)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Collaboration</CardTitle>
        <CardDescription>Manage your project collaborators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Current Collaborators</h3>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>Add Collaborator</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Collaborator</DialogTitle>
                <DialogDescription>
                  Enter the email address of the person you want to invite to collaborate.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCollaborator}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="col-span-3"
                      value={newCollaboratorEmail}
                      onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Send Invitation</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[400px] border rounded-md p-4">
          {collaborators.map(collaborator => (
            <div key={collaborator.id} className="flex items-center justify-between space-x-4 py-2">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{collaborator.name}</p>
                  <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveCollaborator(collaborator.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
