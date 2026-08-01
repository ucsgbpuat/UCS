import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Users } from "lucide-react";
import { TeamMember } from "./TeamManagement";

interface TeamMemberListProps {
  members: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (memberId: string) => void;
}

const TeamMemberList = ({ members, onEdit, onDelete }: TeamMemberListProps) => {
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
      {members.map((member) => (
        <Card
          key={member._id || member.id}
          className="border-border/50 hover:border-primary/30 transition-all overflow-hidden"
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
            <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
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
