// Tools, grouped.
// Rendered to out/api/stack.json at build time — see AGENTS.md; static export
// only prerenders a route handler when it is GET and explicitly force-static.
import { stackResource } from '../../../data/api';

export const dynamic = 'force-static';

export async function GET() {
  const data = stackResource();
  return Response.json({ count: data.length, data });
}
