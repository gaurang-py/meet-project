'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Overview from '@/components/Overview';
import Invoices from '@/components/Invoices';
import Clients from '@/components/Clients';
import Sales from '@/components/Sales';
import Settings from '@/components/Settings';
import { CollaborationPageComponent } from '@/components/collaboration-page';

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Welcome to AI-Based Invoicing System
          </h1>

          {/* Render content based on active tab */}
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'invoices' && <Invoices />}
          {activeTab === 'clients' && <Clients />}
          {activeTab === 'sales' && <Sales />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'collaborators' && <CollaborationPageComponent />}
        </div>
      </main>
    </div>
  );
}
