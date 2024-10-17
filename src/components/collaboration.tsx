'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

// Simulated user data
const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', avatar: '/placeholder-avatar-1.jpg' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', avatar: '/placeholder-avatar-2.jpg' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', avatar: '/placeholder-avatar-3.jpg' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', avatar: '/placeholder-avatar-4.jpg' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', avatar: '/placeholder-avatar-5.jpg' },
  // Add more mock users as needed
]

export function Collaboration() {
  const [users, setUsers] = useState(mockUsers)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Simulated API call to fetch users
  useEffect(() => {
    // In a real application, you would fetch users from your API here
    // For now, we'll use the mock data
    setUsers(mockUsers)
  }, [])

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUserSelect = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleCollaborate = () => {
    const collaborators = users.filter(user => selectedUsers.includes(user.id))
    console.log('Collaborating with:', collaborators)
    // Here you would typically send this data to your backend
    alert(`Collaboration started with ${collaborators.length} users!`)
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Collaboration</CardTitle>
        <CardDescription>Select team members to collaborate with on this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search Users</Label>
            <Input
              id="search"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[300px] border rounded-md p-4">
            {filteredUsers.map(user => (
              <div key={user.id} className="flex items-center space-x-4 py-2">
                <Checkbox
                  id={`user-${user.id}`}
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => handleUserSelect(user.id)}
                />
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </p>
            <Button onClick={handleCollaborate} disabled={selectedUsers.length === 0}>
              Start Collaboration
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}