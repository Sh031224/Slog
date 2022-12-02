import serverless from "serverless-http";

import app from "./app";

const handler = serverless(app);

export { handler };
