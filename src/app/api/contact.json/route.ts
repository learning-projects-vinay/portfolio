// How to reach me.
// Rendered to out/api/contact.json at build time — see AGENTS.md; static export
// only prerenders a route handler when it is GET and explicitly force-static.
import { contactResource } from '../../../data/api';

export const dynamic = 'force-static';

export async function GET() {
  return Response.json(contactResource());
}
