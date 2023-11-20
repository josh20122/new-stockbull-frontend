export const useCustomFetch = (request, opts) => {
  const config = useRuntimeConfig();

  console.log(config);
  return useFetch(request, {
    baseURL: "https://stockbullsecure.com/api",
    onRequest({ request, options }) {
      // Set the request headers
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
      return response._data;
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
    ...opts,
  });
};
