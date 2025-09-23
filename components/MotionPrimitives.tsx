"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const FadeIn = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

export const Rise = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 32, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay }}>
    {children}
  </motion.div>
);

export const HoverFloat = ({ children }: { children: ReactNode }) => (
  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 200 }}>
    {children}
  </motion.div>
);