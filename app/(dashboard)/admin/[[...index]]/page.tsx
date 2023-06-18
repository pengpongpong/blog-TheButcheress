"use client";

import config from "@/sanity.config";
import { NextStudio } from "next-sanity/studio";
import React from "react";

function Admin() {
  return <NextStudio config={config} />;
}

export default Admin;
