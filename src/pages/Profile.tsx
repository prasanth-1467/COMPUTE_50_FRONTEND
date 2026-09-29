import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { PersonalDetails } from '../components/profile/PersonalDetails';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { TeamSection } from '../components/profile/TeamSection';
import { StatusCards } from '../components/profile/StatusCards';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/user.service';
import { UserProfile } from '../types/user';
import { User } from '../types/auth';
import { LogOut } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await userService.getUserProfile();
        if (user) {
          data.user = user;
        }
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveProfile = async (updatedData: Partial<User>) => {
    if (profile) {
      const updatedUser = await userService.updateUserProfile(updatedData);
      updateUser(updatedUser);
      setProfile({ ...profile, user: updatedUser });
    }
  };

  const handleCreateTeam = async (teamName: string) => {
    if (profile) {
      const newTeam = await userService.createTeam(teamName);
      setProfile({ ...profile, team: newTeam });
    }
  };

  if (loading || !profile) {
    return <LoadingState message="Loading participant dashboard..." fullScreen />;
  }

  return (
    <div className="py-16 bg-slate-950 min-h-screen">
      <Container size="lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
          <div>
            <SectionHeading
              badge="DASHBOARD"
              title="Participant Profile"
              subtitle="Manage your personal details, team composition, and registration status."
              align="left"
              className="mb-0 max-w-xl"
            />
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleLogout}
            leftIcon={<LogOut className="w-4 h-4" />}
          >
            Logout
          </Button>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          <PersonalDetails user={profile.user} onEdit={() => setIsEditModalOpen(true)} />
          <StatusCards
            registrationStatus={profile.registrationStatus}
            paymentStatus={profile.paymentStatus}
            accommodationStatus={profile.accommodationStatus}
            receiptUrl={profile.receiptUrl}
          />
          <TeamSection team={profile.team} onCreateTeam={handleCreateTeam} />
        </div>

        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={profile.user}
          onSave={handleSaveProfile}
        />
      </Container>
    </div>
  );
};

export default Profile;
