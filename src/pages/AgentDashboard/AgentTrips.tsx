
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilePlus2, ListFilter } from "lucide-react";
import { TripDataTable } from "./components/trips/TripDataTable";
import { columns } from "./components/trips/columns";

const mockTrips = [
  {
    id: "TRIP789123",
    clientName: "Alice Johnson",
    clientAvatar: "/avatars/01.png",
    date: "2024-07-25",
    time: "10:00 AM",
    status: "Confirmed",
    propertyCount: 3,
    source: "Web Inquiry",
  },
  {
    id: "TRIP456789",
    clientName: "Michael Scott",
    clientAvatar: "/avatars/02.png",
    date: "2024-07-26",
    time: "2:30 PM",
    status: "Pending",
    propertyCount: 2,
    source: "Referral",
  },
  {
    id: "TRIP123456",
    clientName: "Dwight Schrute",
    clientAvatar: "/avatars/03.png",
    date: "2024-07-28",
    time: "11:00 AM",
    status: "Completed",
    propertyCount: 5,
    source: "Walk-in",
  },
  {
    id: "TRIP987654",
    clientName: "Pam Beesly",
    clientAvatar: "/avatars/04.png",
    date: "2024-07-29",
    time: "4:00 PM",
    status: "Cancelled",
    propertyCount: 1,
    source: "Zillow",
  },
];

export default function AgentTrips() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trip Command Center</h2>
          <p className="text-muted-foreground">
            Coordinate viewings, manage client itineraries, and track feedback.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <ListFilter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-primary shadow-lg shadow-primary/25">
            <FilePlus2 className="w-4 h-4 mr-2" />
            Create New Trip
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Trips</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
            <TripDataTable columns={columns} data={mockTrips} />
        </TabsContent>
        <TabsContent value="upcoming">
            <TripDataTable columns={columns} data={mockTrips.filter(t => t.status === 'Confirmed')} />
        </TabsContent>
         <TabsContent value="pending">
            <TripDataTable columns={columns} data={mockTrips.filter(t => t.status === 'Pending')} />
        </TabsContent>
         <TabsContent value="completed">
            <TripDataTable columns={columns} data={mockTrips.filter(t => t.status === 'Completed')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
