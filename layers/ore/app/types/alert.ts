export type AlertProps = {
  label?: string;
  role?: "alert" | "status";
  icon?: IconAlias;
  variant?: OreVariants["alert"];
  size?: OreSizes["alert"];
  color?: OreColors["alert"];
  radius?: OreRadius["alert"];
  density?: OreDensity["alert"];
  elevation?: OreElevation["alert"];
};
