import { FlaskConical, Flower2, House, Mountain, Sprout, Wrench } from "lucide-react";

const ICONS = { sprout: Sprout, flower: Flower2, mountain: Mountain, houseplant: House, flask: FlaskConical, wrench: Wrench };

export default function ServiceIcon({ name, ...props }) {
  const Icon = ICONS[name] || Sprout;
  return <Icon aria-hidden="true" strokeWidth={1.7} {...props} />;
}
