import React, { useState, useEffect, JSX, useCallback } from "react";
import debounce from "lodash.debounce";
import styles from "./form.module.css";
import { fetchGravatarProfile } from "../../services/gravatar";
import { convertGravatarResponse } from "../../utils";
import RenderWhen from "../../common/HOC/RenderWhen";
import { Button } from "../../common/Button/Button";
import { FormData } from "../../types/profile";

interface FormProps {
  onSubmit: (data: FormData) => void;
}

export const Form = ({ onSubmit }: FormProps): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    fullName: "",
    username: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    profileImage: "",
    profileUrl: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const debouncedFetch = React.useMemo(
    () =>
      debounce(async (email: string) => {
        if (!email) return;
        const response = await fetchGravatarProfile(email);

        const gravatarData = convertGravatarResponse(response);

        if (gravatarData) {
          setFormData((prev) => ({
            ...prev,
            fullName: prev.fullName || gravatarData.fullName || "",
            username: prev.username || gravatarData.username || "",
            location: prev.location || gravatarData.location || "",
            bio: prev.bio || gravatarData.bio || "",
            profileImage: gravatarData?.profileImage || "",
            profileUrl: gravatarData.profileUrl || "",
            socialLinks: gravatarData.socialLinks || "",
          }));

          setErrors((prev) => {
            const keys = Object.keys(prev);
            keys.forEach((key) => {
              if (
                gravatarData[key as keyof typeof convertGravatarResponse] &&
                prev[key]
              )
                delete prev[key];
            });

            return prev;
          });
        }
      }, 1000),
    []
  );

  useEffect(() => {
    debouncedFetch(formData.email);
    return () => {
      debouncedFetch.cancel();
    };
  }, [formData.email, debouncedFetch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (value != "" && prev[name]) delete prev[name];
      return prev;
    });
  };

  const validate = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.location) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} autoComplete="off">
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <RenderWhen isTrue={Boolean(errors.email)}>
            <p className={styles.error}>{errors.email}</p>
          </RenderWhen>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="off"
          />
          <RenderWhen isTrue={Boolean(errors.fullName)}>
            <p className={styles.error}>{errors.fullName}</p>
          </RenderWhen>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
          />
          <RenderWhen isTrue={Boolean(errors.username)}>
            <p className={styles.error}>{errors.username}</p>
          </RenderWhen>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="off"
          />
          <RenderWhen isTrue={Boolean(errors.phone)}>
            <p className={styles.error}>{errors.phone}</p>
          </RenderWhen>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location">Location (City, Country)</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            autoComplete="off"
          />
          <RenderWhen isTrue={Boolean(errors.location)}>
            <p className={styles.error}>{errors.location}</p>
          </RenderWhen>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="website">Website / Social Profile URL</label>
          <input
            id="website"
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bio">Bio / Short Description</label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <Button
            onClick={handleSubmit}
            isDisabled={Boolean(Object.keys(errors).length)}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
