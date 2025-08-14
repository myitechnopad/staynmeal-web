// hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import api from "../api/axios"; // Custom axios instance with token if available

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
        const res = await api.get("/users/me");
        setUser(res.data);
        } catch (err) {
        console.error("Error loading user", err);
        } finally {
        setLoading(false);
        }
    };
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, refetch: fetchUser };
};
