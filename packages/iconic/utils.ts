import icIcons from "@iconify-json/ic/icons.json";
import circleFlagsIcons from "@iconify-json/circle-flags/icons.json";

// Extract icon names from Iconify JSON
export const extractIconNames = (
  iconSet: any,
  prefix: string,
  filter?: (name: string) => boolean,
): string[] => {
  const names = Object.keys(iconSet.icons || {});
  const filtered = filter ? names.filter(filter) : names;
  return filtered.map((name) => `${prefix}:${name}`);
};

// Available icons from our supported sets
export const availableIcons = [
  ...extractIconNames(icIcons, "ic", (name) => name.startsWith("twotone-")),
  ...extractIconNames(circleFlagsIcons, "circle-flags"),
];

// Extract icon data for a given icon name
export const getIconData = (iconName: string) => {
  const [prefix, name] = iconName.split(":");
  if (!name) return null;

  if (prefix === "ic") {
    const isValidIconName = (n: string): n is keyof typeof icIcons.icons => n in icIcons.icons;
    if (!isValidIconName(name)) return null;
    const icon = icIcons.icons[name];
    if (!icon) return null;
    return {
      body: icon.body,
      width: 24,
      height: 24,
    };
  } else if (prefix === "circle-flags") {
    const isValidIconName = (n: string): n is keyof typeof circleFlagsIcons.icons => n in circleFlagsIcons.icons;
    if (!isValidIconName(name)) return null;
    const icon = circleFlagsIcons.icons[name];
    if (!icon) return null;
    return {
      body: icon.body,
      width: 24,
      height: 24,
    };
  }

  return null;
};
