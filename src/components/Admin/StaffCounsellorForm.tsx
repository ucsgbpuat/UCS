import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StaffCounsellor } from "./TeamManagement";

interface StaffCounsellorFormProps {
  initialData?: StaffCounsellor;
  onSubmit: (data: StaffCounsellor) => void;
  onCancel: () => void;
}

const StaffCounsellorForm = ({
  initialData,
  onSubmit,
  onCancel,
}: StaffCounsellorFormProps) => {
  const [formData, setFormData] = useState<StaffCounsellor>({
    name: "",
    designation: "Staff Counsellor",
    department: "",
    college: "",
    email: "",
    phone: "",
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
    if (
      !formData.name ||
      !formData.department ||
      !formData.college ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

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
            placeholder="e.g., Dr. John Smith"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Designation *
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Staff Counsellor"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Department *
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Department of Communication"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* College */}
        <div>
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

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 1234567890"
            className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
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
        <Button type="submit">Save Counsellor</Button>
      </div>
    </form>
  );
};

export default StaffCounsellorForm;
