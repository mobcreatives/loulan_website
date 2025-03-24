"use client";
import { useState } from "react";
import { EyeIcon, Trash2Icon, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  Button,
  PageTitle,
} from "@/components";
import { mockContactRequests, statusStyles } from "./data";

export default function ContactRequest() {
  const [requests, setRequests] = useState(mockContactRequests);

  const handleView = (id: string) => {
    console.log("View contact request with ID:", id);
  };

  const handleDelete = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id));
    console.log("Delete contact request with ID:", id);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    console.log(`Changed status of request ${id} to ${newStatus}`);
  };

  return (
    <div>
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
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    {new Date(request.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {request.email}
                    </div>
                  </TableCell>
                  <TableCell>{request.subject}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusStyles[
                          request.status as keyof typeof statusStyles
                        ]
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
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
                      {request.status !== "responded" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleStatusChange(request.id, "responded")
                          }
                          className="h-8 w-8 text-green-500"
                        >
                          <CheckCircle size={16} />
                        </Button>
                      )}
                      {request.status !== "closed" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleStatusChange(request.id, "closed")
                          }
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
    </div>
  );
}
