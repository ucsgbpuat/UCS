import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TeamMemberForm from "./TeamMemberForm";
import TeamMemberList from "./TeamMemberList";
import StaffCounsellorForm from "./StaffCounsellorForm";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { getBackendUri } from "@/lib/apiConfig";

export interface TeamMember {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  college: string;
  imageUrl: string;
}

export interface StaffCounsellor {
  _id?: string;
  id?: string;
  name: string;
  designation: string;
  department: string;
  college: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const TeamManagement = () => {
  const [coreCommittee, setCoreCommittee] = useState<TeamMember[]>([]);
  const [staffCounsellor, setStaffCounsellor] = useState<StaffCounsellor | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showCounsellorForm, setShowCounsellorForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [activeTab, setActiveTab] = useState("committee");

  const API_URL = `${getBackendUri()}/api`;

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      // Fetch core committee
      let committeeRes = await fetch(`${API_URL}/team/committee`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      // If unauthorized or not found, try public endpoint
      if (!committeeRes.ok && (committeeRes.status === 401 || committeeRes.status === 404)) {
        committeeRes = await fetch(`${API_URL}/team/committee-public`);
      }
      if (committeeRes.ok) {
        const data = await committeeRes.json();
        setCoreCommittee(data);
      }

      // Fetch staff counsellor
      let counsellorRes = await fetch(`${API_URL}/team/counsellor`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      // If unauthorized or not found, try public endpoint
      if (!counsellorRes.ok && (counsellorRes.status === 401 || counsellorRes.status === 404)) {
        counsellorRes = await fetch(`${API_URL}/team/counsellor-public`);
      }
      if (counsellorRes.ok) {
        const data = await counsellorRes.json();
        setStaffCounsellor(data);
      }
    } catch (err) {
      toast.error("Failed to fetch team data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (memberData: TeamMember) => {
    try {
      const token = localStorage.getItem("adminToken");
      const method = editingMember ? "PUT" : "POST";
      const url = editingMember
        ? `${API_URL}/team/committee/${editingMember._id || editingMember.id}`
        : `${API_URL}/team/committee`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(memberData),
      });

      if (response.ok) {
        toast.success(
          editingMember
            ? "Team member updated successfully"
            : "Team member added successfully"
        );
        fetchTeamData();
        setShowMemberForm(false);
        setEditingMember(null);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to save member");
      }
    } catch (err) {
      toast.error("Error saving member");
      console.error(err);
    }
  };

  const handleAddCounsellor = async (counsellorData: StaffCounsellor) => {
    try {
      const token = localStorage.getItem("adminToken");
      const method = staffCounsellor ? "PUT" : "POST";
      const url = staffCounsellor
        ? `${API_URL}/team/counsellor/${staffCounsellor._id || staffCounsellor.id}`
        : `${API_URL}/team/counsellor`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(counsellorData),
      });

      if (response.ok) {
        toast.success("Staff counsellor updated successfully");
        fetchTeamData();
        setShowCounsellorForm(false);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to save counsellor");
      }
    } catch (err) {
      toast.error("Error saving counsellor");
      console.error(err);
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/team/committee/${memberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("Member removed successfully");
        fetchTeamData();
      } else {
        toast.error("Failed to remove member");
      }
    } catch (err) {
      toast.error("Error removing member");
      console.error(err);
    }
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setShowMemberForm(true);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="committee">Core Committee</TabsTrigger>
          <TabsTrigger value="counsellor">Staff Counsellor</TabsTrigger>
        </TabsList>

        {/* Core Committee Tab */}
        <TabsContent value="committee" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Core Committee Management
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Manage core committee members and positions
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingMember(null);
                setShowMemberForm(!showMemberForm);
              }}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              {showMemberForm ? "Cancel" : "Add Member"}
            </Button>
          </div>

          {showMemberForm && (
            <Card className="border-primary/30 bg-card/50">
              <CardHeader>
                <CardTitle>
                  {editingMember ? "Edit Member" : "Add New Member"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TeamMemberForm
                  initialData={editingMember || undefined}
                  onSubmit={handleAddMember}
                  onCancel={() => {
                    setShowMemberForm(false);
                    setEditingMember(null);
                  }}
                />
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading team data...</p>
            </div>
          ) : (
            <TeamMemberList
              members={coreCommittee}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
            />
          )}
        </TabsContent>

        {/* Staff Counsellor Tab */}
        <TabsContent value="counsellor" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Staff Counsellor Management
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Manage staff counsellor information
              </p>
            </div>
            <Button
              onClick={() => setShowCounsellorForm(!showCounsellorForm)}
              className="gap-2"
            >
              {showCounsellorForm ? "Cancel" : "Edit Counsellor"}
            </Button>
          </div>

          {showCounsellorForm && (
            <Card className="border-primary/30 bg-card/50">
              <CardHeader>
                <CardTitle>Edit Staff Counsellor</CardTitle>
              </CardHeader>
              <CardContent>
                <StaffCounsellorForm
                  initialData={staffCounsellor || undefined}
                  onSubmit={handleAddCounsellor}
                  onCancel={() => setShowCounsellorForm(false)}
                />
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading counsellor data...</p>
            </div>
          ) : staffCounsellor ? (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>{staffCounsellor.name}</CardTitle>
                <CardDescription>{staffCounsellor.designation}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staffCounsellor.imageUrl && (
                    <img
                      src={staffCounsellor.imageUrl}
                      alt={staffCounsellor.name}
                      className="w-48 h-48 object-cover rounded-lg border border-border/50"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="text-foreground font-medium">
                        {staffCounsellor.department}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">College</p>
                      <p className="text-foreground font-medium">
                        {staffCounsellor.college}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">
                        {staffCounsellor.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">
                        {staffCounsellor.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-8 text-center">
                <p className="text-muted-foreground">No staff counsellor added yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamManagement;
