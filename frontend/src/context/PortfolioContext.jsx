import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioAPI } from '../services/api';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        profileRes,
        skillsRes,
        experienceRes,
        projectsRes,
        educationRes,
        certificationsRes,
        leadershipRes,
        settingsRes
      ] = await Promise.allSettled([
        portfolioAPI.getProfile(),
        portfolioAPI.getSkills(),
        portfolioAPI.getExperience(),
        portfolioAPI.getProjects(),
        portfolioAPI.getEducation(),
        portfolioAPI.getCertifications(),
        portfolioAPI.getLeadership(),
        portfolioAPI.getSettings()
      ]);

      if (profileRes.status === 'fulfilled' && profileRes.value.success) setProfile(profileRes.value.data);
      if (skillsRes.status === 'fulfilled' && skillsRes.value.success) setSkills(skillsRes.value.data);
      if (experienceRes.status === 'fulfilled' && experienceRes.value.success) setExperience(experienceRes.value.data);
      if (projectsRes.status === 'fulfilled' && projectsRes.value.success) setProjects(projectsRes.value.data);
      if (educationRes.status === 'fulfilled' && educationRes.value.success) setEducation(educationRes.value.data);
      if (certificationsRes.status === 'fulfilled' && certificationsRes.value.success) setCertifications(certificationsRes.value.data);
      if (leadershipRes.status === 'fulfilled' && leadershipRes.value.success) setLeadership(leadershipRes.value.data);
      if (settingsRes.status === 'fulfilled' && settingsRes.value.success) setSettings(settingsRes.value.data);

    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError('Could not connect to backend server. Operating with cached data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        experience,
        projects,
        education,
        certifications,
        leadership,
        settings,
        loading,
        error,
        refreshData: fetchAllData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
