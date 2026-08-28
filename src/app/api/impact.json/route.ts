// Headline metrics and the capabilities behind them.
// Rendered to out/api/impact.json at build time — see AGENTS.md; static export
// only prerenders a route handler when it is GET and explicitly force-static.
import { impactResource } from '../../../data/api';

export const dynamic = 'force-static';

export async function GET() {
  return Response.json(impactResource());
}
