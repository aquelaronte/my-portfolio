import { ExternalLink, Mail } from "lucide-react";
import { Button } from "../ui/button";

export function ContactSayHello() {
  return (
    <Button
      size="lg"
      className="group"
      render={
        <a href="mailto:contact@brahianarias.dev">
          <Mail className="h-4 w-4 mr-2" />
          Say Hello
          <ExternalLink className="h-3 w-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
        </a>
      }
    />
  )
}