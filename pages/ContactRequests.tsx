
import { useState } from 'react';
import { EyeIcon, Trash2Icon, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageTitle from '@/components/ui/PageTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

// Mock data for initial development
const mockContactRequests = [
  {
    id: '1',
    name: 'Jennifer Lopez',
    email: 'jennifer@example.com',
    phone: '555-123-7890',
    subject: 'Private Event Inquiry',
    message: 'I would like to book your restaurant for a private corporate event next month. Please provide details on availability and pricing.',
    date: '2023-08-10',
    status: 'new'
  },
  {
    id: '2',
    name: 'Thomas White',
    email: 'thomas@example.com',
    phone: '555-456-7891',
    subject: 'Catering Services',
    message: 'Do you offer catering services for off-site events? I need catering for 50 people.',
    date: '2023-08-08',
    status: 'responded'
  },
  {
    id: '3',
    name: 'Laura Chen',
    email: 'laura@example.com',
    phone: '555-789-1234',
    subject: 'Allergen Information',
    message: 'I have severe nut allergies. Can you provide detailed allergen information for your menu items?',
    date: '2023-08-05',
    status: 'new'
  }
];

const statusStyles = {
  new: 'bg-blue-100 text-blue-800',
  responded: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800'
};

const ContactRequests = () => {
  const [requests, setRequests] = useState(mockContactRequests);

  const handleView = (id: string) => {
    console.log('View contact request with ID:', id);
  };

  const handleDelete = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
    console.log('Delete contact request with ID:', id);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setRequests(
      requests.map(req => 
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    console.log(`Changed status of request ${id} to ${newStatus}`);
  };

  return (
    <DashboardLayout>
      <PageTitle
        title="Contact Requests"
        description="Manage inquiries from the website contact form"
      />

      <Card className="mt-8">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(request => (
                <TableRow key={request.id}>
                  <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-muted-foreground">{request.email}</div>
                  </TableCell>
                  <TableCell>{request.subject}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[request.status as keyof typeof statusStyles]}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleView(request.id)}
                        className="h-8 w-8 text-amber-500"
                      >
                        <EyeIcon size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(request.id)}
                        className="h-8 w-8 text-red-500"
                      >
                        <Trash2Icon size={16} />
                      </Button>
                      {request.status !== 'responded' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(request.id, 'responded')}
                          className="h-8 w-8 text-green-500"
                        >
                          <CheckCircle size={16} />
                        </Button>
                      )}
                      {request.status !== 'closed' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(request.id, 'closed')}
                          className="h-8 w-8 text-gray-500"
                        >
                          <XCircle size={16} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ContactRequests;
