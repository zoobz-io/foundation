export interface AppLocalePassthrough {
  root?: Passthrough<PopoverProps, PopoverEmits>;
  trigger?: Passthrough<FabProps>;
  command?: Passthrough<CommandProps, CommandEmits>;
}

export interface AppLocaleProps {
  pt?: AppLocalePassthrough;
}
