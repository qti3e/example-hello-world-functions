export default () => {
    const envs = JSON.stringify(process.env, null, 2);
    new Response("env: " + envs);
}

export const config = { path: "/test" };
