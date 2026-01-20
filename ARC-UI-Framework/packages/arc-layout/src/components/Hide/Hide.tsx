import React from "react";
import { Show, type ShowProps } from "../Show";

/**
 * Hide = Show'un tersidir.
 * Koşul sağlanıyorsa children gizlenir.
 */
export function Hide(props: ShowProps) {
  return <Show {...props} invert />;
}
