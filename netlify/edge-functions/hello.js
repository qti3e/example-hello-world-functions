// hello there!
// 
// I'm a serverless function that you can deploy as part of your site.
// I'll get deployed to AWS Lambda, but you don't need to know that. 
// You can develop and deploy serverless functions right here as part
// of your site. Netlify Functions will handle the rest for you.


exports.handler = async event => {
    const envs = JSON.stringify(process.env, null, 2);
    return {
        statusCode: 200,
        body: envs
    }
}
