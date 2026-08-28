// The discovery document — every route in one place.
// Rendered to out/api/index.json at build time — see AGENTS.md; static export
// only prerenders a route handler when it is GET and explicitly force-static.
import { indexResource } from '../../../data/api';

export const dynamic = 'force-static';

export async function GET() {
  return Response.json(indexResource());
}
