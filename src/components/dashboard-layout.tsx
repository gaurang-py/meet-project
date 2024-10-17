'use client';

import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Overview from './Overview';
import Invoices from './Invoices';
import Clients from './Clients';
import Sales from './Sales';
import Settings from './Settings';

export default function DashboardLayout() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold">AI Invoicing</h2>
        </div>

        <Tabs defaultValue="overview" orientation="vertical" className="flex flex-col h-full">
          <TabsList className="flex flex-col items-stretch">
            <TabsTrigger value="overview" className="justify-start">
              Overview
            </TabsTrigger>
            <TabsTrigger value="invoices" className="justify-start">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="clients" className="justify-start">
              Clients
            </TabsTrigger>
            <TabsTrigger value="sales" className="justify-start">
              Sales
            </TabsTrigger>
            <TabsTrigger value="settings" className="justify-start">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          <TabsContent value="invoices">
            <Invoices />
          </TabsContent>
          <TabsContent value="clients">
            <Clients />
          </TabsContent>
          <TabsContent value="sales">
            <Sales />
          </TabsContent>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>

        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8">
          Welcome to AI-Based Invoicing System
        </h1>
      </div>
    </div>
  );
}
