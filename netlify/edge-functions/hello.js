const traces = [];

function pHeadersToResponse(reqHeaders, resHeaders) {
    for (const [name, value] of reqHeaders.entries()) {
        if (name.toLowerCase().startsWith("p-")) {
            const outName = name.slice(2); // strip "p-"
            // Skip a couple of sensitive/managed headers; extend if desired
            if (!["content-length", "transfer-encoding"].includes(outName.toLowerCase())) {
                resHeaders.set(outName, value);
            }
        }
    }
}

async function serve(req) {
    const url = new URL(req.url);
    const headersObj = Object.fromEntries(req.headers.entries());
    const trace = {
        ts: new Date().toISOString(),
        method: req.method,
        url: req.url,
        path: url.pathname,
        headers: headersObj,
    };

    // Record this request into the trace list (best-effort, non-durable)
    traces.push(trace);
    console.log(trace);
    if (url.pathname === "/trace") {
        const resHeaders = new Headers({
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-cache, max-age=0",
        });
        const body = JSON.stringify(traces, null, 2);
        return new Response(body, { status: 200, headers: resHeaders });
    }
    // Default: echo headers as JSON
    const resHeaders = new Headers({
        "content-type": "application/json; charset=utf-8",
    });
    pHeadersToResponse(req.headers, resHeaders);
    const body = JSON.stringify({ ...headersObj, "x-time": Date.now(), "x-time-utc": (new Date("Fri Jan 20 2012 11:51:36 GMT-0500").toUTCString()) }, null, 2);
    return new Response(body, { status: 200, headers: resHeaders });
}

export default (r) => serve(r);

export const config = { cache: "manual", path: "/test" };
