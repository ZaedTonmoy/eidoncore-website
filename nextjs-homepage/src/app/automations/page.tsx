"use client";

import React from "react";
import ModulePageTemplate from "@/components/ModulePageTemplate";
import { MODULES_MAP } from "@/content/modules-data";

export default function AutomationsPage() {
  const data = MODULES_MAP["automations"];
  if (!data) return null;
  return <ModulePageTemplate {...data} />;
}
