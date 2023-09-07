import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

function UserProfileDetails() {
  const user = useSelector((state) => state.user?.user);

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
        {user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={user?.photoURL}
              alt={user?.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </>
        ) : (
          <>
            <p className="text-xl text-white font-semibold capitalize">
              {user?.email[0]}
            </p>
          </>
        )}
      </div>

      <motion.div
        whileTap={{ scale: 0.9 }}
        className="p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer"
      >
        <FaChevronDown className="text-primaryText" />
      </motion.div>
    </div>
  );
}

export default UserProfileDetails;
