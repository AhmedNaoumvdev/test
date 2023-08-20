import "./ProfileBadge.css";
import DarkButton from "../../landing/components/DarkButton";
import { useAuth } from "../../context/AuthProvider";

interface ProfileProps {
  toggled?: boolean;
}

const ProfileBadge = ({ toggled }: ProfileProps) => {
  const { user } = useAuth();

  return (
    <div className={toggled ? "toggledBadge" : "profileBadge"}>
      <div className="badge">
        <div className="photoBadge">
          <img src={user?.photoURL || undefined} alt="" />
        </div>
        {!toggled && user && user.displayName}
      </div>
      <DarkButton />
    </div>
  );
};

export default ProfileBadge;
