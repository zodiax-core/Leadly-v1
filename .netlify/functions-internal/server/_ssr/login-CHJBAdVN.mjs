import { i as __toESM } from "../_runtime.mjs";
import { l as require_jsx_runtime, n as useAuthActions, u as require_react } from "../_libs/@convex-dev/auth+[...].mjs";
import { N as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as hero_sky_default } from "./hero-sky-C5yefQhx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CHJBAdVN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const { signIn } = useAuthActions();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("signIn");
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await signIn("password", {
				email,
				password,
				flow: mode
			});
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden md:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_sky_default,
					alt: "",
					className: "absolute inset-0 w-full h-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-foreground/30 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "absolute top-8 left-8 font-serif text-2xl italic text-white",
					children: ["Lead", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "not-italic font-sans font-medium",
						children: "ly"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-10 left-10 right-10 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-3xl italic max-w-md leading-snug",
						children: "\"Leadly turned our blog into our #1 source of qualified pipeline.\""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-sm opacity-80",
						children: "— Alisha, Head of Growth at Kiro"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "md:hidden font-serif text-2xl italic block mb-8",
						children: ["Lead", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "not-italic font-sans font-medium",
							children: "ly"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl",
						children: mode === "signIn" ? "Welcome back" : "Create account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-2 text-sm",
						children: mode === "signIn" ? "Sign in to continue to your dashboard." : "Get started with your free account."
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-xl bg-destructive/10 text-destructive text-sm p-3",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-8 space-y-3",
						onSubmit: handleSubmit,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "you@company.com",
								className: "mt-1 w-full rounded-xl border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 ring-ring",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground",
									children: "Password"
								}), mode === "signIn" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "text-xs text-muted-foreground hover:text-foreground cursor-pointer",
									children: "Forgot?"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••",
								className: "mt-1 w-full rounded-xl border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 ring-ring",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: loading,
								className: "w-full rounded-full bg-foreground text-background py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-50",
								children: loading ? "Loading..." : mode === "signIn" ? "Sign in" : "Create account"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs text-center text-muted-foreground",
						children: mode === "signIn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"New here?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode("signUp");
									setError(null);
								},
								className: "text-foreground underline cursor-pointer bg-transparent border-none p-0",
								children: "Create an account"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode("signIn");
									setError(null);
								},
								className: "text-foreground underline cursor-pointer bg-transparent border-none p-0",
								children: "Sign in"
							})
						] })
					})
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
