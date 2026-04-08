import { ExternalLink, Mail } from "lucide-react";
import { Button } from "../ui/button";

export function ContactSayHello() {
  return (
    <Button
      size="lg"
      className="group"
      render={
        <a href="mailto:hello@arias.systems">
          <Mail className="mr-2 h-4 w-4" />
          Say Hello
          <ExternalLink className="ml-2 h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
        </a>
      }
    />
  );
}
