"use client";

import React from "react";
import ModulePageTemplate from "@/components/ModulePageTemplate";
import { MODULES_MAP } from "@/content/modules-data";

export default function NotificationsPage() {
  const data = MODULES_MAP["notifications"];
  if (!data) return null;
  return <ModulePageTemplate {...data} />;
}
