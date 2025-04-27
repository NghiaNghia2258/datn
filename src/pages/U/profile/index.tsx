import { ProfileProvider } from "../../../context/U/profile";
import UserProfile from "../../../features/U/profile";

const Profile = () => {
  return (
    <ProfileProvider>
      <UserProfile />
    </ProfileProvider>
  );
};

export default Profile;
