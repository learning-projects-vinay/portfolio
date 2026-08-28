// Case studies — problem, build, outcome.
// Rendered to out/api/projects.json at build time — see AGENTS.md; static export
// only prerenders a route handler when it is GET and explicitly force-static.
import { projectsResource } from '../../../data/api';

export const dynamic = 'force-static';

export async function GET() {
  const data = projectsResource();
  return Response.json({ count: data.length, data });
}
