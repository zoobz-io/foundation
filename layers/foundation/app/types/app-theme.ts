export interface AppThemePassthrough {
  root?: Passthrough<PopoverProps, PopoverEmits>;
  trigger?: Passthrough<FabProps>;
  command?: Passthrough<CommandProps, CommandEmits>;
}

export interface AppThemeProps {
  pt?: AppThemePassthrough;
}
