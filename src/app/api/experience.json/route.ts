// Roles, newest first.
// Rendered to out/api/experience.json at build time — see AGENTS.md; static export
// only prerenders a route handler when it is GET and explicitly force-static.
import { experienceResource } from '../../../data/api';

export const dynamic = 'force-static';

export async function GET() {
  const data = experienceResource();
  return Response.json({ count: data.length, data });
}
