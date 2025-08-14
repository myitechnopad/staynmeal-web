// === src/pages/UserProfile.tsx ===
import React, { useState } from 'react';
import {
  User, Wallet, HeartHandshake, BadgeCheck,
  Pencil, ListPlus, MapPin, Heart, Home, Star, Wallet as WalletIcon, HelpCircle, UserCircle
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

function calculateProfileCompletion(profile: any) {
  const totalFields = 10;
  let filled = 0;
  if (profile.full_name) filled++;
  if (profile.email) filled++;
  if (profile.mobile) filled++;
  if (profile.city) filled++;
  if (profile.food) filled++;
  if (profile.budget) filled++;
  if (profile.gender) filled++;
  if (profile.age_group) filled++;
  if (profile.profession) filled++;
  if (profile.avatar) filled++;
  return Math.floor((filled / totalFields) * 100);
}

const ProfileCard = ({ title, icon, editable = false, editing, onEditClick, onSaveClick, children }: any) => (
  <div className="bg-white shadow rounded-xl p-4">
    <div className="flex justify-between items-center mb-4 text-gray-800 font-medium">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-md">{title}</h3>
      </div>
      {editable && (
        <button
          className="text-green-600 hover:text-green-800 text-sm"
          onClick={editing ? onSaveClick : onEditClick}
        >
          {editing ? 'Save' : <Pencil size={16} />}
        </button>
      )}
    </div>
    {children}
  </div>
);

const FieldView = ({ label, value }: any) => (
  <li className="flex justify-between items-center gap-4">
    <div className="text-sm text-gray-700">
      <span className="font-medium">{label}: </span>
      <span>{value || '-'}</span>
    </div>
  </li>
);

const FieldEdit = ({ label, value, field, onChange }: any) => (
  <li className="flex justify-between items-center gap-4">
    <div className="text-sm text-gray-700">
      <span className="font-medium">{label}: </span>
      <input
        className="border p-1 text-sm rounded w-40"
        value={value || ''}
        onChange={(e) => onChange(field, e.target.value)}
      />
    </div>
  </li>
);

export default function UserProfile() {
  const { user, loading,refetch } = useUserProfile();
  const { updateProfile } = useUpdateProfile();
  const [profile, setProfile] = useState<any>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [editingSection, setEditingSection] = useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      //setProfile({ ...user });
    }
  }, [user]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (!user) return <div className="text-center p-6 text-red-500">User not found</div>;

  const completion = calculateProfileCompletion(profile);

  const handleChange = (field: string, value: any) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSectionSave = async (fields: string[]) => {
    const payload: any = {};
    fields.forEach((field) => {
      payload[field] = profile[field];
    });
    await updateProfile(payload);
    refetch();
    setEditingSection(null);
  };

  return (
    <div className="pt-20 max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <ProfileCard title="">
            <div className="relative flex-shrink-0 group">
            {profile.avatar ? (
                <img
                src={profile.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
                onClick={() => document.getElementById('avatar-upload')?.click()}
                />
            ) : (
                <UserCircle
                size={80}
                className="text-green-600 cursor-pointer"
                onClick={() => document.getElementById('avatar-upload')?.click()}
                />
            )}

            <input
            type="file"
            accept="image/*"
            id="avatar-upload"
            className="hidden"
            onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append("avatar", file);

                console.log("Uploading avatar:", file.name);
                //await updateProfile(formData);  // ← this now works
                refetch();                      // ← show updated avatar
                }
            }}
            />


            <div
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer group-hover:opacity-100 opacity-0 transition"
                onClick={() => document.getElementById('avatar-upload')?.click()}
            >
                <Pencil size={16} className="text-green-600" />
            </div>
            </div>

        </ProfileCard>
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold text-gray-800">{profile.full_name}</h2>
          <p className="text-gray-500 flex items-center mt-1">
            <MapPin size={16} className="mr-1" /> {profile.city || 'Unknown'}, India
          </p>
        </div>
      </div>

      <div className="mt-4 mb-2 text-sm">
        Profile Completion: <span className="text-green-700 font-semibold">{completion}%</span>
        {completion < 100 && (
          <p className="text-xs text-red-500">Complete your profile to get personalized recommendations!</p>
        )}
      </div>

      <Tabs defaultValue="overview" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProfileCard
              title="Basic Info"
              icon={<User size={18} />}
              editable
              editing={editingSection === 'basic'}
              onEditClick={() => setEditingSection('basic')}
              onSaveClick={() => handleSectionSave(['full_name', 'email', 'mobile', 'city'])}
            >
              <ul className="space-y-2">
                {editingSection === 'basic' ? (
                  <>
                    <FieldEdit label="Full Name" value={profile.full_name} field="full_name" onChange={handleChange} />
                    <FieldEdit label="Email" value={profile.email} field="email" onChange={handleChange} />
                    <FieldEdit label="Mobile" value={profile.mobile} field="mobile" onChange={handleChange} />
                    <FieldEdit label="City" value={profile.city} field="city" onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <FieldView label="Full Name" value={profile.full_name} />
                    <FieldView label="Email" value={profile.email} />
                    <FieldView label="Mobile" value={profile.mobile} />
                    <FieldView label="City" value={profile.city} />
                  </>
                )}
              </ul>
            </ProfileCard>

            <ProfileCard
              title="Preferences"
              icon={<HeartHandshake size={18} />}
              editable
              editing={editingSection === 'preferences'}
              onEditClick={() => setEditingSection('preferences')}
              onSaveClick={() => handleSectionSave(['food', 'budget'])}
            >
              <ul className="space-y-2">
                {editingSection === 'preferences' ? (
                  <>
                    <FieldEdit label="Food" value={profile.food} field="food" onChange={handleChange} />
                    <FieldEdit label="Budget" value={profile.budget} field="budget" onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <FieldView label="Food" value={profile.food_preference} />
                    <FieldView label="Budget" value={profile.budget_max} />
                  </>
                )}
              </ul>
            </ProfileCard>

            <ProfileCard
              title="Identity"
              icon={<BadgeCheck size={18} />}
              editable
              editing={editingSection === 'identity'}
              onEditClick={() => setEditingSection('identity')}
              onSaveClick={() => handleSectionSave(['gender', 'age_group', 'profession'])}
            >
              <ul className="space-y-2">
                {editingSection === 'identity' ? (
                  <>
                    <FieldEdit label="Gender" value={profile.gender} field="gender" onChange={handleChange} />
                    <FieldEdit label="Age Group" value={profile.age_group} field="age_group" onChange={handleChange} />
                    <FieldEdit label="Profession" value={profile.profession} field="profession" onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <FieldView label="Gender" value={profile.gender} />
                    <FieldView label="Age Group" value={profile.age_group} />
                    <FieldView label="Profession" value={profile.profession} />
                  </>
                )}
              </ul>
            </ProfileCard>

            <ProfileCard title="My Listings" icon={<ListPlus size={18} />}>
              <p className="text-sm text-gray-500">You haven’t listed any property yet.</p>
            </ProfileCard>

            <ProfileCard title="My Favorites" icon={<Heart size={18} />}>
              <p className="text-sm text-gray-500">No favorites yet.</p>
            </ProfileCard>

            <ProfileCard title="Reviews" icon={<Star size={18} />}>
              <p className="text-sm text-gray-500">No reviews submitted yet.</p>
            </ProfileCard>

            <ProfileCard title="Wallet" icon={<WalletIcon size={18} />}>
              <p className="text-sm text-gray-500">Balance: ₹0</p>
            </ProfileCard>

            <ProfileCard title="Support & Help" icon={<HelpCircle size={18} />}>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>FAQs</li>
                <li>Raise a Ticket</li>
                <li>Live Chat</li>
              </ul>
            </ProfileCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
