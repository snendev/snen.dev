import { Application, Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { contentType } from "https://deno.land/x/media_types@v2.11.1/mod.ts";
import ReactDOMServer from "https://esm.sh/react-dom@18.0.0-rc.0/server?deps=react@18.0.0-rc.0&pin=v59";
import "https://esm.sh/react-router@6.2.1?deps=react@18.0.0-rc.0";
import {
  StaticRouter as ReactStaticRouter,
} from "https://esm.sh/react-router-dom@6.2.1/server?deps=react@18.0.0-rc.0&react-router@6.2.1";

export { Application, contentType, ReactDOMServer, Router, ReactStaticRouter };
