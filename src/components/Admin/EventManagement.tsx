import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EventForm from "./EventForm";
import EventList from "./EventList";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { getBackendUri } from "@/lib/apiConfig";

export interface Event {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  attendees: number;
  eventType: "upcoming" | "past";
}

const EventManagement = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  const API_URL = `${getBackendUri()}/api`;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      
      // Try to fetch with authentication first, fall back to public endpoint
      let response = await fetch(`${API_URL}/events`, {
        headers: token ? {
          Authorization: `Bearer ${token}`,
        } : {},
      });

      // If unauthorized or not found, try public endpoint
      if (!response.ok && (response.status === 401 || response.status === 404)) {
        response = await fetch(`${API_URL}/events`);
      }

      if (response.ok) {
        const data = await response.json();
        const upcoming = data.filter((e: Event) => e.eventType === "upcoming");
        const past = data.filter((e: Event) => e.eventType === "past");
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } else {
        toast.error(`Failed to fetch events: ${response.statusText}`);
      }
    } catch (err) {
      toast.error("Failed to fetch events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (eventData: Event) => {
    try {
      const token = localStorage.getItem("adminToken");
      const method = editingEvent ? "PUT" : "POST";
      const url = editingEvent
        ? `${API_URL}/events/${editingEvent._id || editingEvent.id}`
        : `${API_URL}/events`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        toast.success(
          editingEvent ? "Event updated successfully" : "Event added successfully"
        );
        fetchEvents();
        setShowForm(false);
        setEditingEvent(null);
      } else {
        const error = await response.json();
        toast.error("Failed to save event");
      }
    } catch (err) {
      toast.error("Error saving event");
      console.error(err);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Event deleted successfully");
        fetchEvents();
      } else {
        toast.error("Failed to delete event");
      }
    } catch (err) {
      toast.error("Error deleting event");
      console.error(err);
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Event Management</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Add, edit, or delete events from your calendar
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingEvent(null);
            setShowForm(!showForm);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Cancel" : "Add Event"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="border-primary/30 bg-card/50">
          <CardHeader>
            <CardTitle>
              {editingEvent ? "Edit Event" : "Create New Event"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EventForm
              initialData={editingEvent || undefined}
              onSubmit={handleAddEvent}
              onCancel={() => {
                setShowForm(false);
                setEditingEvent(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <EventList
              events={upcomingEvents}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>

          <TabsContent value="past">
            <EventList
              events={pastEvents}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EventManagement;
