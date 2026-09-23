"use client";

import React from "react";
import ModulePageTemplate from "@/components/ModulePageTemplate";
import { MODULES_MAP } from "@/content/modules-data";

export default function ServicesPage() {
  const data = MODULES_MAP["services"];
  if (!data) return null;
  return <ModulePageTemplate {...data} />;
}
