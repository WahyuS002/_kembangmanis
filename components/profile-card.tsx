import React from "react";
import ProfileList from "@/components/profile-list";

const ProfileCard = ({
  id,
  name,
  role,
  profiles = [],
}: {
  id: number;
  name: string;
  role: string;
  profiles: any[];
}) => {
  return (
    <div className="text-center">
      <div className="border shadow px-4 py-2 inline-block">
        <div className="flex flex-col items-center">
          <div className="w-16">
            <img
              className="block rounded-full border-4 border-zinc-900 m-auto"
              alt={name}
              src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
            />
          </div>
          <div className="text-zinc-600">
            <p>{name}</p>
            <p>{role}</p>
          </div>
        </div>
      </div>
      {profiles.length > 0 && <ProfileList profiles={profiles} />}
    </div>
  );
};

export default ProfileCard;
