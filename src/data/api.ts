// The career data from profile.ts, re-shaped as a small read-only HTTP API.
//
// This module is the single source of truth for two surfaces that must never
// disagree: the static JSON files emitted at build time (src/app/api/*.json,
// genuinely curl-able) and the in-page console that resolves the same routes
// client-side. Both import the resource builders below, so adding a field to
// profile.ts lands in the files and the console at once.
//
// Filters (?company=…) are console-side sugar — a static file cannot read a
// query string. The discovery document says so out loud rather than implying a
// server that isn't there.

import {
  profile,
  experience,
  projects,
  stack,
  capabilities,
  education,
  heroStats,
  formatPeriod,
  formatDuration,
  totalExperienceYears,
  withPrefix,
} from './profile';

export const API_VERSION = '1.0.0';
export const API_NAME = 'vinay-panwar.api';

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* ------------------------------------------------------------------ *
 * Resources — the exact payloads the static files contain.
 * ------------------------------------------------------------------ */

export const profileResource = () => ({
  name: profile.name,
  role: profile.role,
  focus: profile.focus,
  company: profile.company,
  experience_years: totalExperienceYears(),
  location: profile.location,
  timezone: profile.timezone,
  availability: profile.availability,
  languages: profile.languages.split(', '),
  email: profile.email,
  links: profile.links,
  resume: withPrefix(profile.resumePath),
});

export const experienceResource = () =>
  experience.map((role) => ({
    slug: slugify(role.title),
    title: role.title,
    company: role.company,
    start: role.start,
    end: role.end ?? null,
    current: !role.end,
    period: formatPeriod(role.start, role.end),
    duration: formatDuration(role.start, role.end),
    summary: role.summary,
    highlights: role.achievements,
    tags: role.tags,
  }));

export const projectsResource = () =>
  projects.map((project) => ({
    slug: slugify(project.title),
    title: project.title,
    flagship: Boolean(project.flagship),
    problem: project.problem,
    build: project.build,
    outcome: project.outcome,
    tech: project.tech,
    links: project.links,
    ...(project.privateNote ? { note: project.privateNote } : {}),
  }));

export const stackResource = () =>
  stack.map((group) => ({
    group: group.group,
    slug: slugify(group.group),
    items: group.items,
  }));

export const impactResource = () => ({
  headline: heroStats.map((stat) => ({ metric: stat.value, measures: stat.label })),
  capabilities: capabilities.map((capability) => ({
    slug: slugify(capability.title),
    title: capability.title,
    summary: capability.description,
    metric: capability.metric,
  })),
});

export const educationResource = () =>
  education.map((entry) => ({
    slug: slugify(entry.degree),
    degree: entry.degree,
    institution: entry.institution,
    period: entry.period,
    grade: entry.grade,
  }));

export const contactResource = () => ({
  email: profile.email,
  location: profile.location,
  timezone: profile.timezone,
  availability: profile.availability,
  responds_within: '24 hours on weekdays',
  links: profile.links,
  resume: withPrefix(profile.resumePath),
});

/* ------------------------------------------------------------------ *
 * Request / response plumbing
 * ------------------------------------------------------------------ */

export interface ApiRequest {
  method: string;
  path: string;
  query: Record<string, string>;
  raw: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  body: unknown;
}

const STATUS_TEXT: Record<number, string> = {
  200: 'OK',
  400: 'Bad Request',
  404: 'Not Found',
  405: 'Method Not Allowed',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

export const ok = (body: unknown): ApiResponse => ({ status: 200, statusText: 'OK', body });

export const fail = (
  status: number,
  code: string,
  message: string,
  extra: Record<string, unknown> = {},
): ApiResponse => ({
  status,
  statusText: STATUS_TEXT[status] ?? 'Error',
  body: { error: { status, code, message, ...extra } },
});

const collection = <T>(data: T[]) => ({ count: data.length, data });

const contains = (haystack: string, needle: string) =>
  haystack.toLowerCase().includes(needle.toLowerCase());

// Rejecting unknown params (instead of ignoring them) is what makes a typo in
// the console feel like a real API rather than a search box that shrugs.
const guardParams = (req: ApiRequest, allowed: string[]): ApiResponse | null => {
  const unknown = Object.keys(req.query).find((key) => !allowed.includes(key));
  if (!unknown) return null;
  return fail(400, 'unknown_parameter', `Unknown query parameter '${unknown}'.`, {
    supported_parameters: allowed,
  });
};

export type RouteKind = 'data' | 'ask' | 'download';

export interface RouteDef {
  method: 'GET' | 'POST';
  path: string;
  summary: string;
  /** Path of the matching build-time file, when this route has one. */
  file?: string;
  params?: { name: string; description: string }[];
  examples?: string[];
  /** Non-`data` routes need the console (network, downloads) to finish the job. */
  kind?: RouteKind;
  schema?: Record<string, unknown>;
  resolve: (req: ApiRequest) => ApiResponse;
}

const projectSchema = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    title: { type: 'string' },
    flagship: { type: 'boolean' },
    problem: { type: 'string' },
    build: { type: 'string' },
    outcome: { type: 'string' },
    tech: { type: 'array', items: { type: 'string' } },
    links: {
      type: 'array',
      items: {
        type: 'object',
        properties: { label: { type: 'string' }, href: { type: 'string', format: 'uri' } },
      },
    },
    note: { type: 'string' },
  },
} as const;

const roleSchema = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    title: { type: 'string' },
    company: { type: 'string' },
    start: { type: 'string', pattern: '^\\d{4}-\\d{2}$' },
    end: { type: ['string', 'null'] },
    current: { type: 'boolean' },
    period: { type: 'string' },
    duration: { type: 'string' },
    summary: { type: 'string' },
    highlights: { type: 'array', items: { type: 'string' } },
    tags: { type: 'array', items: { type: 'string' } },
  },
} as const;

const collectionSchema = (items: Record<string, unknown>) => ({
  type: 'object',
  properties: { count: { type: 'integer' }, data: { type: 'array', items } },
});

export const apiRoutes: RouteDef[] = [
  {
    method: 'GET',
    path: '/',
    summary: 'Discovery document — every route, listed.',
    file: '/api/index.json',
    examples: ['GET /'],
    resolve: () => ok(indexResource()),
  },
  {
    method: 'GET',
    path: '/profile',
    summary: 'Who I am, where I am, and what I answer to.',
    file: '/api/profile.json',
    examples: ['GET /profile'],
    schema: { type: 'object' },
    resolve: () => ok(profileResource()),
  },
  {
    method: 'GET',
    path: '/experience',
    summary: 'Roles, in reverse-chronological order.',
    file: '/api/experience.json',
    params: [
      { name: 'company', description: 'Match on company name.' },
      { name: 'tag', description: 'Match on a role tag, e.g. azure.' },
      { name: 'current', description: 'true to return only the active role.' },
    ],
    examples: ['GET /experience', 'GET /experience?tag=azure', 'GET /experience?current=true'],
    schema: collectionSchema(roleSchema),
    resolve: (req) => {
      const invalid = guardParams(req, ['company', 'tag', 'current']);
      if (invalid) return invalid;

      let roles = experienceResource();
      if (req.query.company) {
        roles = roles.filter((role) => contains(role.company, req.query.company));
      }
      if (req.query.tag) {
        roles = roles.filter((role) => role.tags.some((tag) => contains(tag, req.query.tag)));
      }
      if (req.query.current === 'true') {
        roles = roles.filter((role) => role.current);
      }
      return ok(collection(roles));
    },
  },
  {
    method: 'GET',
    path: '/experience/:slug',
    summary: 'A single role, in full.',
    examples: ['GET /experience/senior-software-engineer'],
    schema: roleSchema,
    resolve: (req) => {
      const slug = req.path.split('/')[2];
      const role = experienceResource().find((entry) => entry.slug === slug);
      return role
        ? ok(role)
        : fail(404, 'role_not_found', `No role with slug '${slug}'.`, {
            available: experienceResource().map((entry) => entry.slug),
          });
    },
  },
  {
    method: 'GET',
    path: '/projects',
    summary: 'Case studies — problem, build, outcome.',
    file: '/api/projects.json',
    params: [
      { name: 'tech', description: 'Match on a technology, e.g. ollama.' },
      { name: 'flagship', description: 'true for the headline project only.' },
    ],
    examples: ['GET /projects', 'GET /projects?tech=ollama', 'GET /projects?flagship=true'],
    schema: collectionSchema(projectSchema),
    resolve: (req) => {
      const invalid = guardParams(req, ['tech', 'flagship']);
      if (invalid) return invalid;

      let entries = projectsResource();
      if (req.query.tech) {
        entries = entries.filter((entry) =>
          entry.tech.some((tech) => contains(tech, req.query.tech)),
        );
      }
      if (req.query.flagship === 'true') {
        entries = entries.filter((entry) => entry.flagship);
      }
      return ok(collection(entries));
    },
  },
  {
    method: 'GET',
    path: '/projects/:slug',
    summary: 'A single case study.',
    examples: ['GET /projects/multi-agent-ai-assistant'],
    schema: projectSchema,
    resolve: (req) => {
      const slug = req.path.split('/')[2];
      const project = projectsResource().find((entry) => entry.slug === slug);
      return project
        ? ok(project)
        : fail(404, 'project_not_found', `No project with slug '${slug}'.`, {
            available: projectsResource().map((entry) => entry.slug),
          });
    },
  },
  {
    method: 'GET',
    path: '/stack',
    summary: 'Tools I reach for, grouped.',
    file: '/api/stack.json',
    params: [
      { name: 'group', description: 'Filter to one group, e.g. ai.' },
      { name: 'q', description: 'Search across every item.' },
    ],
    examples: ['GET /stack', 'GET /stack?group=ai', 'GET /stack?q=azure'],
    schema: collectionSchema({ type: 'object' }),
    resolve: (req) => {
      const invalid = guardParams(req, ['group', 'q']);
      if (invalid) return invalid;

      let groups = stackResource();
      if (req.query.group) {
        groups = groups.filter((group) => contains(group.group, req.query.group));
      }
      if (req.query.q) {
        groups = groups
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => contains(item, req.query.q)),
          }))
          .filter((group) => group.items.length > 0);
      }
      return ok(collection(groups));
    },
  },
  {
    method: 'GET',
    path: '/impact',
    summary: 'The numbers, and what produced them.',
    file: '/api/impact.json',
    examples: ['GET /impact'],
    schema: { type: 'object' },
    resolve: () => ok(impactResource()),
  },
  {
    method: 'GET',
    path: '/education',
    summary: 'Degrees and grades.',
    file: '/api/education.json',
    examples: ['GET /education'],
    schema: collectionSchema({ type: 'object' }),
    resolve: () => ok(collection(educationResource())),
  },
  {
    method: 'GET',
    path: '/contact',
    summary: 'How to reach me, and how fast I answer.',
    file: '/api/contact.json',
    examples: ['GET /contact'],
    schema: { type: 'object' },
    resolve: () => ok(contactResource()),
  },
  {
    method: 'GET',
    path: '/resume',
    summary: 'Download the PDF résumé.',
    kind: 'download',
    examples: ['GET /resume'],
    resolve: () =>
      ok({
        file: 'Vinay_Panwar_Resume.pdf',
        format: 'application/pdf',
        url: withPrefix(profile.resumePath),
        status: 'download started',
      }),
  },
  {
    method: 'POST',
    path: '/ask',
    summary: 'Ask my AI anything — grounded in this résumé.',
    kind: 'ask',
    params: [{ name: 'q', description: 'Your question. Also accepted as the request body.' }],
    examples: ['POST /ask?q=what is his AI experience', 'POST /ask why should we hire him'],
    resolve: () => ok({ status: 'pending' }),
  },
];

export const indexResource = () => ({
  name: API_NAME,
  version: API_VERSION,
  description: `${profile.name} — ${profile.role}. Career data as JSON, served from a static export.`,
  documentation: withPrefix('/api/openapi.json'),
  note: 'Query filters (?company=…) are applied by this console. The static files under /api serve the full collection.',
  endpoints: apiRoutes.map((route) => ({
    method: route.method,
    path: route.path,
    summary: route.summary,
    ...(route.file ? { file: withPrefix(route.file) } : {}),
    ...(route.params ? { parameters: route.params.map((param) => param.name) } : {}),
  })),
});

/* ------------------------------------------------------------------ *
 * Resolver — parses a typed command into a request, then a response.
 * ------------------------------------------------------------------ */

// Levenshtein, so a mistyped path answers with a suggestion instead of a
// dead end. Bounded by the length of a route path, so the O(n·m) is free.
const editDistance = (a: string, b: string) => {
  const rows = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = rows[0];
    rows[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const swap = rows[j];
      rows[j] = Math.min(
        rows[j] + 1,
        rows[j - 1] + 1,
        previous + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      previous = swap;
    }
  }
  return rows[b.length];
};

const nearestPath = (path: string) => {
  const ranked = apiRoutes
    .filter((route) => !route.path.includes(':'))
    .map((route) => ({ path: route.path, distance: editDistance(path, route.path) }))
    .sort((a, b) => a.distance - b.distance);
  const best = ranked[0];
  return best && best.distance <= Math.max(3, Math.ceil(path.length / 2)) ? best.path : undefined;
};

const matchRoute = (method: string, path: string) => {
  const segments = path.split('/').filter(Boolean);
  return apiRoutes.find((route) => {
    if (route.method !== method) return false;
    const routeSegments = route.path.split('/').filter(Boolean);
    if (routeSegments.length !== segments.length) return false;
    return routeSegments.every(
      (segment, index) => segment.startsWith(':') || segment === segments[index],
    );
  });
};

export const parseCommand = (input: string): ApiRequest | null => {
  const raw = input.trim();
  if (!raw) return null;

  const [first, ...rest] = raw.split(/\s+/);
  const hasMethod = /^(get|post|put|patch|delete|head|options)$/i.test(first);
  const method = hasMethod ? first.toUpperCase() : 'GET';
  const target = hasMethod ? rest.join(' ') : raw;

  // `POST /ask why hire him` — everything after the path is the question, so
  // the free text is preserved rather than being mangled into a path.
  const [pathPart, ...trailing] = target.split(/\s+/);
  const [pathname, search = ''] = pathPart.split('?');

  const query: Record<string, string> = {};
  for (const pair of search.split('&').filter(Boolean)) {
    const [key, value = ''] = pair.split('=');
    if (key) query[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
  }
  if (trailing.length > 0 && !query.q) query.q = trailing.join(' ');

  const path = pathname === '' || pathname === '/' ? '/' : `/${pathname.replace(/^\/|\/$/g, '')}`;
  return { method, path, query, raw };
};

export interface ResolvedRequest {
  request: ApiRequest;
  route?: RouteDef;
  response: ApiResponse;
}

export const resolveRequest = (input: string): ResolvedRequest | null => {
  const request = parseCommand(input);
  if (!request) return null;

  const route = matchRoute(request.method, request.path);
  if (route) return { request, route, response: route.resolve(request) };

  // A path that exists under a different verb is a 405, not a 404 — the same
  // distinction a real router would draw.
  const otherVerb = apiRoutes.find((entry) => {
    const routeSegments = entry.path.split('/').filter(Boolean);
    const segments = request.path.split('/').filter(Boolean);
    return (
      routeSegments.length === segments.length &&
      routeSegments.every((segment, index) => segment.startsWith(':') || segment === segments[index])
    );
  });

  if (otherVerb) {
    return {
      request,
      response: fail(
        405,
        'method_not_allowed',
        `${request.method} is not supported on ${request.path}.`,
        { allowed: [otherVerb.method] },
      ),
    };
  }

  const suggestion = nearestPath(request.path);
  return {
    request,
    response: fail(404, 'route_not_found', `No route for ${request.method} ${request.path}.`, {
      ...(suggestion ? { did_you_mean: `${request.method} ${suggestion}` } : {}),
      hint: "Send 'GET /' for the full list of routes.",
    }),
  };
};

/* ------------------------------------------------------------------ *
 * OpenAPI — generated from the registry above so it cannot drift.
 * Only the routes backed by a real file are described, because those are
 * the only ones a reader can actually call with curl.
 * ------------------------------------------------------------------ */

export const openApiSpec = () => ({
  openapi: '3.1.0',
  info: {
    title: `${profile.name} — Career API`,
    version: API_VERSION,
    summary: 'The contents of a résumé, as JSON.',
    description:
      'A static, read-only API served from a Next.js static export. Every path below is a real file; GET is the only verb.',
    contact: { name: profile.name, email: profile.email, url: profile.links.linkedin },
    license: { name: 'MIT', identifier: 'MIT' },
  },
  servers: [{ url: withPrefix('/api'), description: 'Static export' }],
  paths: Object.fromEntries(
    apiRoutes
      .filter((route) => route.file)
      .map((route) => [
        route.file!.replace('/api', ''),
        {
          get: {
            summary: route.summary,
            operationId: slugify(route.path === '/' ? 'get-index' : `get-${route.path}`),
            responses: {
              '200': {
                description: route.summary,
                content: {
                  'application/json': { schema: route.schema ?? { type: 'object' } },
                },
              },
            },
          },
        },
      ]),
  ),
});
