import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Calendar, MapPin, Users } from "lucide-react";
import { Event } from "./EventManagement";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

const EventList = ({ events, onEdit, onDelete }: EventListProps) => {
  if (events.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardContent className="pt-8 text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No events found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <Card key={event._id || event.id} className="border-border/50 hover:border-primary/30 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription className="mt-1">{event.category}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(event)}
                  className="text-blue-500 hover:text-blue-600 hover:bg-blue-50/10"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(event._id || event.id || "")}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{event.date}</span>
                  <span className="text-muted-foreground">{event.time}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{event.venue}</span>
                </div>

                {event.attendees > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {event.attendees} attendees expected
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm text-foreground line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            {event.image && (
              <div className="mt-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-32 object-cover rounded-lg border border-border/50"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
