export const baseUrl = "http://localhost:8080/api";

export const fetcher = (url: string) => fetch(baseUrl + url,
    {
        headers: { accept: "application/json" }
    }
).then((res) => res.json());

export const postFetcher = (url: string, data: any) => fetch(baseUrl + url, {
    method: 'post',
    headers: {
        accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});

export const postUploadFileFetcher = (url: string, data: any) => fetch(baseUrl + url, {
    method: 'post',
    redirect: 'follow',
    body: data
});

export const putFetcher = (url: string, data: any) => fetch(baseUrl + url, {
    method: 'put',
    headers: {
        accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});

export const putFetcherNoBody = (url: string) => fetch(baseUrl + url, {
    method: 'put',
    headers: {
        accept: "application/json",
        "Content-Type": "application/json"
    }
});

export const getFetcher = (url: string) => fetch(baseUrl + url, {
    method: 'get',
    headers: {
        accept: "application/json",
    },
});

export const patchFetcher = (url: string) => fetch(baseUrl + url, {
    method: 'patch',
    headers: {
        accept: "application/json",
    },
});

export const deleteFetcher = (url: string) => fetch(baseUrl + url, {
    method: 'delete',
    headers: {
        accept: "application/json",
    },
});