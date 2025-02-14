"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@mui/material";
import projectData from "../../../../utils/Config/carbon_projects.json";
import Image from "next/image";
import logo from "../../../../../public/images/decarbtoken.png";

export default function ProjectPage() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="text-center p-6">Loading...</div>;
  }

  const projectName = decodeURIComponent(pathname.split("/").pop() || "");
  const project = projectData.projects.find((p) => p.name === projectName);

  if (!project) {
    return <div className="text-center p-6">Project not found</div>;
  }

  return (
    <div className="font-syne bg-gray-100 overflow-y-auto h-screen p-4">
      {/* Header Section */}
      <div className="bg-grey-900 text-black p-6 rounded-2xl shadow-lg flex items-center gap-4">
        <Image
          src={logo}
          alt="Project Logo"
          className="w-16 h-16 rounded-full"
          width={64}
          height={64}
        />
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p>
            {project.location}, by <strong>{project.proponents}</strong>
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="bg-white text-black py-2 px-4 rounded-full">
              Project-ID {project.project_id}
            </div>
            <div className="bg-white text-black py-2 px-4 rounded-full">
              Status {project.status}
            </div>
            <div className="bg-white text-black py-2 px-4 rounded-full">
              BeZero {project.bezero_rating}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 space-y-6">
          {/* Overview Section */}
          <div className="bg-[#2F4F4F] text-white p-6 rounded-2xl shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex flex-col">
                <small className="text-sm">Total Supply:</small>
                <div className="font-bold text-lg">{project.overview.total_supply}</div>
              </div>
              <div className="flex flex-col">
                <small className="text-sm">Category:</small>
                <div className="font-bold text-lg">{project.overview.category}</div>
              </div>
              <div className="flex flex-col">
                <small className="text-sm">Carbon Standard:</small>
                <div className="font-bold text-lg">{project.overview.carbon_standard}</div>
              </div>
              <div className="flex flex-col">
                <small className="text-sm">BeZero Rating:</small>
                <div className="font-bold text-lg">{project.overview.bezero_rating}</div>
              </div>
              <div className="flex flex-col">
                <small className="text-sm">Supported SDGs:</small>
                <div className="font-bold text-lg">{project.overview.supported_sdgs}</div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p>{project.about}</p>
          </div>

          {/* Project Data Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Project Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <small className="text-sm">Project-ID:</small>
                <div className="font-bold text-lg">{project.project_id}</div>
              </div>
              <div className="flex flex-col">
                <small className="text-sm">Methodology:</small>
                <div className="font-bold text-lg">{project.project_data.methodology}</div>
              </div>
              <div className="flex flex-col">
                <small className="text-sm">Project Location:</small>
                <div className="font-bold text-lg">{project.location}</div>
              </div>
              <div className="flex flex-col">
                <small className="text-sm">Project Size:</small>
                <div className="font-bold text-lg">{project.project_data.project_size}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Project Developer Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold">Project Developer</h2>
            <p>{project.proponents}</p>
            <p>Total Retired: {project.project_developer.total_retired}</p>
            <p>Total Issuance: {project.project_developer.total_issuance}</p>
          </div>

          {/* Milestones Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold">Milestones</h2>
            <p>Project Start: {project.milestones.project_start}</p>
            <p>First Issuance: {project.milestones.first_issuance}</p>
            <p>Project End: {project.milestones.project_end}</p>
          </div>

          {/* Verification Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold">Verification</h2>
            <p>Carbon Standard: {project.verification.carbon_standard}</p>
            <p>Project Validator: {project.verification.project_validator}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
