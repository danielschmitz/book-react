import { useTransition } from "@remix-run/react";

export default function LoadPageSwitch() {
  const transition = useTransition();
  const busy = transition.location;
  return busy ? <div id="loading"></div> : <></>;
}
