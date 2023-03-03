import {Base64} from "js-base64";

export const createUrl = (id: string, key: string): URL => {
    const url = new URL(window.location.href)

    url.searchParams.set('i', id)
    url.searchParams.set('k', key)

    return url
}

export const getDataFromUrl = (): { id: string | null, key: string | null } => {
    const url = new URL(window.location.href)

    return {
        id: url.searchParams.get('i'),
        key: url.searchParams.get('k')
    }
}