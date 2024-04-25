"use client";

import { useCallback, useEffect, useState } from "react";

export const Clock = ({ deadline }: { deadline: number }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const leading0 = (num: number) => {
    return num < 10 ? "0" + num : num;
  };

  const getTimeUntil = useCallback((deadline: number) => {
    const time = Number(deadline) - Date.parse(new Date().toString());

    if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  }, []);

  useEffect(() => {
    setInterval(() => getTimeUntil(deadline), 1000);

    return () => getTimeUntil(deadline);
  }, [deadline, getTimeUntil]);

  return (
    <p className="font-medium text-sm text-neutral-500">
      {leading0(days)} <span className="text-xs">dia</span> {leading0(hours)}{" "}
      <span className="text-xs">hora</span> {leading0(minutes)}{" "}
      <span className="text-xs">min</span> {leading0(seconds)}{" "}
      <span className="text-xs">seg</span>
    </p>
  );
};
