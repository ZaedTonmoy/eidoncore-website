"use client";

import React from "react";
import ModulePageTemplate from "@/components/ModulePageTemplate";
import { MODULES_MAP } from "@/content/modules-data";

export default function IntakeFormsPage() {
  const data = MODULES_MAP["intake-forms"];
  if (!data) return null;
  return <ModulePageTemplate {...data} />;
}
