export type BannerProps = {
  label?: string;
  role?: "banner" | "status" | "alert";
  icon?: IconAlias;
  variant?: OreVariants["banner"];
  size?: OreSizes["banner"];
  color?: OreColors["banner"];
  radius?: OreRadius["banner"];
  density?: OreDensity["banner"];
  elevation?: OreElevation["banner"];
};
