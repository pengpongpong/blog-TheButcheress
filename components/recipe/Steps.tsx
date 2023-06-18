"use client"
import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@mui/material";
import { urlFor } from "@/sanity/lib/sanity-utils";
import Image from "next/image";

import { Instruction } from "@/app/[lang]/rezepte/[slug]/Recipe";

const Steps = ({ list }: { list: Instruction[] }) => {
  const steps = list?.map((instruction) => {
    return (
      <Step key={instruction.title} active={true}>
        <StepLabel
          optional={
            <Typography className="font-text text-xl font-bold tracking-wider text-neutral">
              {instruction.title}
            </Typography>
          }
          StepIconProps={{
            classes: { root: "stepIcon", text: "stepIcon__text" },
          }}
        ></StepLabel>
        <StepContent>
          <Typography className="font-text">{instruction.content}</Typography>
          {instruction.image ? (
              <Image
                width={600}
                height={600}
                loading="lazy"
                className="mx-auto my-8"
                src={urlFor(instruction.image).size(2560, 1440).auto("format").url()}
                alt={instruction.image.title!}
              />
          ) : (
            ""
          )}
          {instruction.tipp?.map((obj) => {
            return (
              <div className="bg-primary p-8 lg:m-4" key={obj.title}>
                <Typography
                  className="mb-4 font-text text-2xl font-bold"
                  component={"h3"}
                >
                  {obj.title}
                </Typography>
                <Typography className="font-text">{obj.content}</Typography>
              </div>
            );
          })
            ?? ""}
        </StepContent>
      </Step>
    );
  });

  return (
    <Stepper
      className="m-4 lg:w-full"
      orientation="vertical"
      component="section"
    >
      {steps}
    </Stepper>
  );
};

export default Steps;
