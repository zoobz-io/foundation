export type ButtonProps = {
  label?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaHaspopup?: boolean | "menu" | "dialog";
  variant?: OreVariants["button"];
  size?: OreSizes["button"];
  color?: OreColors["button"];
  radius?: OreRadius["button"];
  density?: OreDensity["button"];
  elevation?: OreElevation["button"];
};
