// Degrees and grades.
// Rendered to out/api/education.json at build time — see AGENTS.md; static export
// only prerenders a route handler when it is GET and explicitly force-static.
import { educationResource } from '../../../data/api';

export const dynamic = 'force-static';

export async function GET() {
  const data = educationResource();
  return Response.json({ count: data.length, data });
}
