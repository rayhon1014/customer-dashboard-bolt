"use client"

import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Settings, Mail } from 'lucide-react';

const customers = [
  { id: 1, name: 'Jacob Jones', email: 'magusnet@hotmail.com', status: 'Inactive', orders: 11, spent: '€29', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=JJ', hasUnreadMessage: false },
  { id: 2, name: 'Jane Cooper', email: 'samavati@sbcglobal.net', status: 'In process', orders: 8, spent: '€70', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=JC', hasUnreadMessage: true },
  { id: 3, name: 'Courtney Henry', email: 'mfburgo@icloud.com', status: 'Inactive', orders: 14, spent: '€60', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=CH', hasUnreadMessage: false },
  { id: 4, name: 'Ronald Richards', email: 'kudra@mac.com', status: 'New', orders: 19, spent: '€49', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=RR', hasUnreadMessage: true },
  { id: 5, name: 'Ralph Edwards', email: 'maikelnai@icloud.com', status: 'Inactive', orders: 3, spent: '€54', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=RE', hasUnreadMessage: false },
  { id: 6, name: 'Bessie Cooper', email: 'cameron@att.net', status: 'Inactive', orders: 13, spent: '€21', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=BC', hasUnreadMessage: true },
  { id: 7, name: 'Albert Flores', email: 'crobles@icloud.com', status: 'New', orders: 9, spent: '€37', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=AF', hasUnreadMessage: false },
  { id: 8, name: 'Jane Cooper', email: 'samavati@sbcglobal.net', status: 'Inactive', orders: 8, spent: '€70', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=JC', hasUnreadMessage: true },
];

export default function CustomerDashboard() {
  const [filters, setFilters] = useState([
    { label: 'Stock: 2 - 30', active: true },
    { label: 'Tag: Clothing', active: true },
    { label: '11 Apr - 27 Aug', active: true },
  ]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search..."
            className="w-64"
            icon={<Search className="h-4 w-4 text-gray-400" />}
          />
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {filters.map((filter, index) => (
          <Badge
            key={index}
            variant={filter.active ? "default" : "outline"}
            className="cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => {
              const newFilters = [...filters];
              newFilters[index].active = !newFilters[index].active;
              setFilters(newFilters);
            }}
          >
            {filter.label}
            {filter.active && (
              <span className="ml-1" onClick={(e) => {
                e.stopPropagation();
                const newFilters = [...filters];
                newFilters[index].active = false;
                setFilters(newFilters);
              }}>
                ×
              </span>
            )}
          </Badge>
        ))}
        <Badge variant="outline" className="cursor-pointer">All filters</Badge>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>Message</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Checkbox className="border-gray-300 text-indigo-600 focus:ring-0 focus:ring-offset-0" />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {customer.name}
                  </div>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      customer.status === 'Inactive' ? 'secondary' : 
                      customer.status === 'In process' ? 'default' : 
                      'success'
                    }
                    className={
                      customer.status === 'Inactive' ? 'bg-gray-200 text-gray-700' :
                      customer.status === 'In process' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>{customer.spent}</TableCell>
                <TableCell>
                  <Mail className={`h-5 w-5 ${customer.hasUnreadMessage ? 'text-indigo-600' : 'text-gray-400'}`} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">...</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <Button key={page} variant={page === 1 ? "default" : "outline"} size="sm">
              {page}
            </Button>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          Showing 1 to 8 of 100 results
        </div>
      </div>
    </div>
  );
}