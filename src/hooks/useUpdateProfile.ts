// hooks/useUpdateProfile.ts
import { useState } from "react";
import api from "../api/axios";

interface ProfileUpdatePayload {
  full_name?: string;
  mobile?: string;
  city?: string;
  food?: string;
  budget?: string;
  gender?: string;
  age_group?: string;
  profession?: string;
  avatar?: File | null;
}

export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateProfile = async (payload: ProfileUpdatePayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      console.log("Avatar is being sent:", payload);
      // Convert payload to FormData
      Object.entries(payload).forEach(([key, value]) => {
        console.log(`${key}:`, value instanceof File ? value.name : value);
        if (value !== undefined && value !== null) {
          if (key === "avatar" && value instanceof File) {
            formData.append(key, value);
                console.log("Avatar is being sent:", value);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      // Debug logs (can be removed in production)
      console.log("Submitting PATCH /users/me with:");
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      // Send PATCH request with multipart/form-data
      const response = await api.patch("/users/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      return response.data;
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error, success };
}
