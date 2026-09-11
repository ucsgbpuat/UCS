import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, GripVertical, Trash2, Users } from "lucide-react";
import { TeamMember } from "./TeamManagement";

interface TeamMemberListProps {
  members: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (memberId: string) => void;
  onReorder: (members: TeamMember[]) => void;
}

const TeamMemberList = ({ members, onEdit, onDelete, onReorder }: TeamMemberListProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (members.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardContent className="pt-8 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No team members found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member, index) => (
        <Card
          key={member._id || member.id}
          draggable
          onDragStart={() => setDraggedIndex(index)}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOverIndex(index);
          }}
          onDragLeave={() => setDragOverIndex(null)}
          onDrop={(event) => {
            event.preventDefault();
            if (draggedIndex === null || draggedIndex === index) {
              setDraggedIndex(null);
              setDragOverIndex(null);
              return;
            }

            const reorderedMembers = [...members];
            const [draggedMember] = reorderedMembers.splice(draggedIndex, 1);
            reorderedMembers.splice(index, 0, draggedMember);
            onReorder(reorderedMembers);
            setDraggedIndex(null);
            setDragOverIndex(null);
          }}
          onDragEnd={() => {
            setDraggedIndex(null);
            setDragOverIndex(null);
          }}
          className={`overflow-hidden border-border/50 transition-all hover:border-primary/30 ${
            dragOverIndex === index ? "border-primary ring-2 ring-primary/30" : ""
          } ${draggedIndex === index ? "opacity-50" : ""}`}
        >
          {member.imageUrl && (
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <CardContent className="pt-4">
            <div className="mb-1 flex items-start justify-between gap-3">
              <h3 className="font-bold text-foreground">{member.name}</h3>
              <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground" title="Drag to reorder">
                <GripVertical className="h-4 w-4" />
                Move
              </span>
            </div>
            <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
            <p className="text-sm text-muted-foreground mb-4">{member.college}</p>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(member)}
                className="flex-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50/10"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(member._id || member.id || "")}
                className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamMemberList;
