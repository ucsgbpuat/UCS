import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TeamMember } from "./TeamManagement";

interface TeamMemberFormProps {
  initialData?: TeamMember;
  onSubmit: (data: TeamMember) => void;
  onCancel: () => void;
}

const TeamMemberForm = ({ initialData, onSubmit, onCancel }: TeamMemberFormProps) => {
  const [formData, setFormData] = useState<TeamMember>({
    name: "",
    role: "",
    college: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.college) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  const roles = [
    "President",
    "General Secretary",
    "Vice President",
    "Joint Secretary",
    "Treasurer",
    "Media Secretary",
    "Managerial Secretary",
    "Media Head",
    "Event Management Head",
    "Logistic Head",
    "Technical Head",
    "Member",
  ];

  const colleges = [
    "College of Agriculture",
    "College of Technology",
    "College of Veterinary and Animal Sciences",
    "College of Fisheries",
    "College of Basic Science and Humanities",
    "College of Community Science",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Role/Position *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* College */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            College *
          </label>
          <select
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select a college</option>
            {colleges.map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Member" : "Add Member"}
        </Button>
      </div>
    </form>
  );
};

export default TeamMemberForm;
