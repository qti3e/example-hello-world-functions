export default () => {
    const envs = JSON.stringify(Deno.env.toObject(), null, 2);
    return new Response("env: " + envs);
}

export const config = { path: "/test" };
