import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SpecializationSection } from '../components/home/SpecializationSection';
import { FeaturedProjectsSection } from '../components/home/FeaturedProjectsSection';
import { SkillsOverviewSection } from '../components/home/SkillsOverviewSection';
import { AboutPreviewSection } from '../components/home/AboutPreviewSection';
import { ContactCtaSection } from '../components/home/ContactCtaSection';
import { SeoHead } from '../components/common/SeoHead';
import { fetchProjects } from '../lib/api';
import { Project } from '../types';
import { INITIAL_PROJECTS } from '../data/initialData';

export const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  useEffect(() => {
    fetchProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  return (
    <>
      <SeoHead
        title="Full-Stack Developer & Software Engineer"
        description="Official portfolio of Abdushekur Aman — Full-Stack Developer and Information Science student at Haramaya University, Harar, Ethiopia."
      />
      <div className="space-y-6">
        <HeroSection />
        <SpecializationSection />
        <FeaturedProjectsSection projects={projects} />
        <SkillsOverviewSection />
        <AboutPreviewSection />
        <ContactCtaSection />
      </div>
    </>
  );
};
