'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'invoices', label: 'Invoices' },
  { value: 'clients', label: 'Clients' },
  { value: 'sales', label: 'Sales' },
  { value: 'settings', label: 'Settings' },
  { value: 'collaborators', label: 'Collaborators' },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    
    <div className="w-64 h-screen bg-white shadow-md flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold">AI Invoicing</h2>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingTop: '1.3in' }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <TabsList className="flex flex-col space-y-2 p-4">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="w-full justify-start px-3 py-2 text-left rounded-md hover:bg-gray-100"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button variant="outline" onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
}
