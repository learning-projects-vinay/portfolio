// The OpenAPI 3.1 description of the routes above, generated from the same
// registry that serves them so the spec cannot drift from the payloads.
import { openApiSpec } from '../../../data/api';

export const dynamic = 'force-static';

export async function GET() {
  return Response.json(openApiSpec());
}
