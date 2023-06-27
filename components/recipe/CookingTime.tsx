import { Locale } from "@/app/[lang]/(main-nav)/HomePage";
import React, { ReactNode } from "react";

type LocaleProps = {
  locale?: string;
}

const SpanHour = ({ locale }: LocaleProps) => {
  return <span className="text-sm font-bold lg:text-lg"><abbr title={locale === "en" ? "hours" : "Stunden"}>{locale === "en" ? "hrs." : "Std."}</abbr></span>;
};
const SpanMinute = ({ locale }: LocaleProps) => {
  return <span className="text-sm font-bold lg:text-lg"><abbr title={locale === "en" ? "minutes" : "Minutes"}>{locale === "en" ? "min." : "Min."}</abbr></span>;
};
const Time = ({ children }: { children: ReactNode }) => {
  return <p className="text-2xl lg:text-4xl">{children}</p>;
};

const CookingTime = ({
  title,
  hours,
  minutes,
  servings,
  styling,
  lang
}: {
  title: string;
  hours?: number;
  minutes?: number;
  servings?: number;
  styling?: string;
  lang: Locale
}) => {

  return (
    <div className={styling}>
      <p className="pb-4 text-lg font-bold tracking-wider lg:text-2xl">
        {title}
      </p>
      {servings ? (
        <Time>{servings}</Time>
      ) : hours! > 0 ? (
        <Time>
          <>
            {hours} <SpanHour locale={lang} /> {minutes ?? "0"} <SpanMinute locale={lang} />
          </>
        </Time>
      ) : (
        <Time>
          <>
            {minutes} <SpanMinute locale={lang} />
          </>
        </Time>
      )}
    </div>
  );
};

export default CookingTime;
