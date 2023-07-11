"use client"
import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { urlFor } from "@/sanity/lib/sanity-utils";
import Image from "next/image";

import { Instruction } from "@/app/[lang]/rezepte/[slug]/Recipe";

// theme for step icons
const theme = createTheme({
  components: {
    // Name of the component
    MuiStepIcon: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontFamily: "Josefin Slab",
          fill: "#d9e4dd",
        },
        text: {
          fill: "#000"
        }
      },
    },
  },
});


const Steps = ({ list }: { list: Instruction[] }) => {
  const steps = list?.map((instruction, index) => {
    return (
      <Step active={true} key={instruction.title + index}>
          <ThemeProvider theme={theme}>
          <StepLabel
            optional={
              <p className="font-text text-xl font-bold tracking-wider text-neutral">{instruction.title}</p>
            }
            StepIconProps={{
              classes: { root: "stepIcon", text: "stepIcon__text" },
            }}
          ></StepLabel>
          <StepContent>
            <p className="font-text">{instruction.content}</p>
            {instruction.image ? (
              <Image
                style={{ width: "auto", height: "auto" }}
                width={600}
                height={400}
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
                <div className="bg-primary p-6 lg:p-10 lg:m-4" key={obj.title}>
                  <h3 className="mb-4 font-text text-2xl font-bold"> {obj.title}</h3>
                  <p className="font-text">{obj.content}</p>
                </div>
              );
            })
              ?? ""}
          </StepContent>
      </ThemeProvider>
        </Step>
    );
  });

  return (
    <Stepper
      className="mb-8 lg:w-full"
      orientation="vertical"
      component="section"
    >
      {steps}
    </Stepper>
  );
};

export default Steps;
