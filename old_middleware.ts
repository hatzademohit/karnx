import { NextResponse, NextRequest } from "next/server";

type AccessSpec = {
	roles?: string[];
	permissions?: string[];
};

// Central route access policy
const accessPolicies: Record<string, AccessSpec> = {
	"/configuration/role-master": { roles: ["Super Admin", "Aircraft Owner Admin", "Aircraft Operator Admin", "Aircraft Travel Agent Admin"] },
	"/configuration/permission-master": { roles: ["Super Admin", "Aircraft Owner Admin", "Aircraft Operator Admin", "Aircraft Travel Agent Admin"] },
	// Examples:
	// "/configuration/user-master": { permissions: ["user read"] },
	// "/crew-roster": { permissions: ["crew read"] },
	// "/flight-ops": { permissions: ["flight read"] },
	// "/fleet": { permissions: ["fleet read"] },
	// "/company-profile": { permissions: ["crew read"] },
};

const PUBLIC_PATHS = new Set<string>([
	"/",
	"/forgot-password",
	"/reset-password",
	"/activate-account",
]);

function isPublicPath(pathname: string) {
	if (pathname === "/") return true;
	for (const p of PUBLIC_PATHS) {
		if (pathname === p) return true;
	}
	return false;
}

function matchPolicy(pathname: string): AccessSpec | null {
	let matched: AccessSpec | null = null;
	let maxLen = -1;
	for (const prefix of Object.keys(accessPolicies)) {
		if (pathname.startsWith(prefix) && prefix.length > maxLen) {
			matched = accessPolicies[prefix];
			maxLen = prefix.length;
		}
	}
	return matched;
}

function parsePermissions(cookieVal: string | undefined): string[] {
	if (!cookieVal) return [];
	try {
		const parsed = JSON.parse(cookieVal);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

export function middleware(req: NextRequest) {
	const { nextUrl, cookies } = req;
	const pathname = nextUrl.pathname;

	const token = cookies.get("karnx_token")?.value;
	const role = cookies.get("karnx_role")?.value || "";
	const permissions = parsePermissions(cookies.get("karnx_permissions")?.value);

	if (isPublicPath(pathname)) {
		return NextResponse.next();
	}

	if (!token) {
		const url = new URL("/", req.url);
		url.searchParams.set("next", pathname);
		return NextResponse.redirect(url);
	}

	const policy = matchPolicy(pathname);
	if (policy) {
		const rolesOk = !policy.roles || (role && policy.roles.includes(role));
		const permsOk = !policy.permissions || policy.permissions.some((p) => permissions.includes(p));
		const requireBoth = policy.roles && policy.permissions;
		const allowed = requireBoth ? rolesOk && permsOk : rolesOk && permsOk;

		if (!allowed) {
			const url = new URL("/dashboard", req.url);
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|api).*)",
	],
};
