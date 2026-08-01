import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Event } from "./EventManagement";

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: Event) => void;
  onCancel: () => void;
}

const EventForm = ({ initialData, onSubmit, onCancel }: EventFormProps) => {
  const [formData, setFormData] = useState<Event>({
    title: "",
    category: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    image: "",
    attendees: 0,
    eventType: "upcoming",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "attendees" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.category ||
      !formData.date ||
      !formData.time ||
      !formData.venue ||
      !formData.description
    ) {
      alert("Please fill in all fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Nritya Utsav 2024"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Dance Festival"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Time *
          </label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="e.g., 6:00 PM - 10:00 PM"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Venue *
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="e.g., Main Auditorium"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Attendees */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Expected Attendees
          </label>
          <input
            type="number"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            placeholder="0"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Event Type *
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event description"
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
