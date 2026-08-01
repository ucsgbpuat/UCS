"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamMemberCard from "@/components/TeamMemberCard";
import { LazyLoadImage } from "@/components/LazyLoadImage";
import { Mail, Phone } from "lucide-react";
import { getBackendUri } from "@/lib/apiConfig";

interface StaffCounsellor {
  _id?: string;
  name: string;
  designation: string;
  department: string;
  college: string;
  email: string;
  phone: string;
  imageUrl: string;
}

interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  college: string;
  imageUrl: string;
}

const Team = () => {
  const [displayCount, setDisplayCount] = useState(8);
  const [staffCounsellor, setStaffCounsellor] = useState<StaffCounsellor | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        setError(null);

        const backendUri = getBackendUri();

        // Fetch staff counsellor
        const counsellorResponse = await fetch(`${backendUri}/api/team/counsellor-public`);
        if (!counsellorResponse.ok) {
          throw new Error("Failed to fetch staff counsellor");
        }
        const counsellorData = await counsellorResponse.json();
        setStaffCounsellor(counsellorData);

        // Fetch team members
        const membersResponse = await fetch(`${backendUri}/api/team/committee-public`);
        if (!membersResponse.ok) {
          throw new Error("Failed to fetch team members");
        }
        const membersData = await membersResponse.json();
        setTeamMembers(membersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching team data");
        console.error("Error fetching team data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading team information...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md">
            <p className="text-red-500 text-lg font-semibold mb-2">Error Loading Team Data</p>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Staff Counsellor */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary blur-3xl animate-subtle-rotate" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Meet Our Team
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-title-reveal" style={{ animationDelay: "0.2s" }}>
              The People Behind
              <span className="block text-primary">University Cultural Society</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-luxurious-fade" style={{ animationDelay: "0.5s" }}>
              Dedicated individuals working together to celebrate and promote our rich cultural heritage
            </p>
          </div>
          
          {/* Staff Counsellor Card */}
          {staffCounsellor && (
            <div className="max-w-4xl mx-auto animate-royal-slide-in" style={{ animationDelay: "0.6s" }}>
              <div className="relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-elegant royal-card">
                <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
                
                <div className="relative flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-2/5 aspect-square md:aspect-auto">
                    <LazyLoadImage
                      src={staffCounsellor.imageUrl}
                      alt={staffCounsellor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4 w-fit">
                      Staff Counsellor
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {staffCounsellor.name}
                    </h2>
                    <p className="text-primary font-medium mb-2">{staffCounsellor.department}</p>
                    <p className="text-muted-foreground mb-6">{staffCounsellor.college}</p>
                    
                    <div className="space-y-3">
                      <a 
                        href={`mailto:${staffCounsellor.email}`}
                        className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
                      >
                        <Mail size={18} className="text-primary" />
                        <span>{staffCounsellor.email}</span>
                      </a>
                      <a 
                        href={`tel:${staffCounsellor.phone}`}
                        className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
                      >
                        <Phone size={18} className="text-primary" />
                        <span>{staffCounsellor.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Team Members Section */}
      <section className="py-20" style={{"backgroundColor":"#1F2A44"}}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-title-reveal" style={{"color":"#fdf8d0"}}>
              Core Committee
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto animate-luxurious-fade" style={{"color":"#fff", animationDelay: "0.4s"}}>
              The passionate leaders who drive our cultural initiatives forward
            </p>
          </div>
          
          {teamMembers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {teamMembers.slice(0, displayCount).map((member, index) => (
                  <TeamMemberCard
                    key={member._id || member.name}
                    name={member.name}
                    role={member.role}
                    college={member.college}
                    imageUrl={member.imageUrl}
                    className="animate-royal-slide-in"
                    style={{ animationDelay: `${index * 80}ms` } as React.CSSProperties}
                  />
                ))}
              </div>
              
              <div className="flex justify-center gap-4 mt-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                {displayCount > 8 && (
                  <button
                    onClick={() => setDisplayCount(8)}
                    className="royal-button px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300"
                  >
                    Show Less
                  </button>
                )}
                
                {displayCount < teamMembers.length && (
                  <button
                    onClick={() => setDisplayCount(displayCount + 8)}
                    className="royal-button px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300"
                  >
                    Show More
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No team members available</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Team;
