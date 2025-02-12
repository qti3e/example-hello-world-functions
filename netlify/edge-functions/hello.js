export default () => {
    const envs = JSON.stringify(Deno.env.get(), null, 2);
    new Response("env: " + envs);
}

export const config = { path: "/test" };
