"use client";

import React from "react";
import ModulePageTemplate from "@/components/ModulePageTemplate";
import { MODULES_MAP } from "@/content/modules-data";

export default function InvoicingPage() {
  const data = MODULES_MAP["invoicing"];
  if (!data) return null;
  return <ModulePageTemplate {...data} />;
}
