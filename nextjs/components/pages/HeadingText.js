// Section headings are stored as data ({ pre, em, br }) so the content files
// stay free of JSX and can be edited without touching a component.
export function HeadingText({ value }) {
  return <>{value.pre}{value.br && <br />}<em>{value.em}</em></>;
}
