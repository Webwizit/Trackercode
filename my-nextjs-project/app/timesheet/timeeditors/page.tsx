'use client';
import { useState } from 'react';
import { Bell, Mail, User, Clock, ChevronDown, Plus, Edit, Calendar, ListChecks, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

export default function DateRangePicker() {
  const [selectedDates, setSelectedDates] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [calendarOpen, setCalendarOpen] = useState(true); // Open on load

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range && range.from && range.to) {
      setSelectedDates({ from: range.from, to: range.to });
      setCalendarOpen(false); // Close when both dates are selected
    }
  };

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-2">
          <Clock size={24} />
          <h1 className="text-xl font-bold">Time Sheet</h1>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="cursor-pointer text-black fill-black" />
          <Mail className="cursor-pointer text-black fill-semiblack" />
          <Avatar>
            <AvatarImage src="/path-to-avatar.jpg" alt="User Avatar" />
            <AvatarFallback>HR</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
         {/* Filters */}
      {/* Filters */}
<div className="grid grid-cols-4 gap-3 py-3">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="flex items-center w-36 px-3 py-2">
        <User size={14} className="mr-1" /> Hamza Rasheed <ChevronDown size={14} className="ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-auto min-w-[140px]">
      <DropdownMenuItem>Member 1</DropdownMenuItem>
      <DropdownMenuItem>Member 2</DropdownMenuItem>
      <DropdownMenuItem>Member 3</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="flex items-center w-36 px-3 py-2">
        <Folder size={14} className="mr-1" /> Projects <ChevronDown size={14} className="ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-auto min-w-[150px]">
      <DropdownMenuItem>Web Designing</DropdownMenuItem>
      <DropdownMenuItem>Chat App UI</DropdownMenuItem>
      <DropdownMenuItem>App Development</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="flex items-center w-32 px-3 py-2">
        <ListChecks size={14} className="mr-1" /> Tasks <ChevronDown size={14} className="ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-auto min-w-[120px]">
      <DropdownMenuItem>Task 1</DropdownMenuItem>
      <DropdownMenuItem>Task 2</DropdownMenuItem>
      <DropdownMenuItem>Task 3</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  {/* Date Picker with Range Selection */}
  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
    <PopoverTrigger asChild>
      <Button variant="outline" className="flex items-center w-40 px-3 py-2">
        <Calendar size={14} className="mr-1" />
        {selectedDates.from && selectedDates.to
          ? `${selectedDates.from.toLocaleDateString()} - ${selectedDates.to.toLocaleDateString()}`
          : 'Select Date'}
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start">
      <CalendarComponent
        mode="range"
        selected={{ from: selectedDates.from ?? new Date(), to: selectedDates.to ?? new Date() }}
        onSelect={handleSelect}
        numberOfMonths={2}
      />
    </PopoverContent>
  </Popover>
</div>

      {/* Actions */}
      <div className="flex justify-between py-4">
        <Button className="flex items-center bg-purple-600 text-white hover:bg-purple-700">
          <Plus size={16} className="mr-2" /> Add Time
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center">
            <Edit size={16} className="mr-2" /> Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                Columns <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Total Time</DropdownMenuItem>
              <DropdownMenuItem>Amount Owed</DropdownMenuItem>
              <DropdownMenuItem>Paid Leave</DropdownMenuItem>
              <DropdownMenuItem>Absent</DropdownMenuItem>
              <DropdownMenuItem>Holiday</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Stats Section */}
      <Card>
        <CardContent className="grid grid-cols-5 gap-4 p-6 text-center">
          <div>
            <p className="text-sm text-gray-500">Total Time</p>
            <p className="font-bold">0:00</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount Owed</p>
            <p className="font-bold">$0.00</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Paid Leave</p>
            <p className="font-bold">0:00</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Absent</p>
            <p className="font-bold">2</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Holiday</p>
            <p className="font-bold">--</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}