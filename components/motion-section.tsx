"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function MotionSection({ children, className, id }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className={cn("section-padding", className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
