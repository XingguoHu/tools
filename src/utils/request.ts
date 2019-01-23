/**
 * 网络请求方法
 *
 * @export default
 * @param {string} url
 * @param {string} method // GET, POST, PUT, DELETE, etc.
 * @param {requstParams} params
 * @returns {Promise<any>}
 */

const global: any = window;
const origin = `${global.location.origin}/api`;

export default async function(
  url: string,
  method: string,
  params: requstParams = {}
): Promise<any> {
  const { body, query } = params;
  const type = typeof query;
  let queryString = "";
  method = method.toUpperCase();
  url = `${origin}${url}`;

  if (type !== "object" && type !== "undefined") {
    console.error(`The query type cannot be ${type}`);
    return;
  }

  if (query) {
    queryString = (
      Object.keys(query).map(key => {
        const value = query[key];
        if (value || (typeof value === "number" && value === 0)) {
          return `${key}=${value}`;
        }
      }) || []
    ).join("&");
    url = queryString ? `${url}?${queryString}` : `${url}`;
  }

  try {
    const response = await fetch(
      url,
      Object.assign(
        {
          method, // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "omit", // include, same-origin, *omit
          headers: {
            "content-type": "application/json" // Default options are marked with *
          },
          mode: "cors", // no-cors, cors, *same-origin
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer" // *client, no-referrer
        },
        method === "GET" || method === "HEAD"
          ? null
          : {
              body: JSON.stringify(body || {}) // must match 'Content-Type' header
            }
      )
    );
    const { status } = response;
    if (status === 200) {
      const { error, results } = await response.json();
      if (!error) {
        return results;
      } else {
        throw results;
      }
    } else {
      throw status;
    }
  } catch (e) {
    throw e;
  }
}
