type PathName = `/${string}`

type ResponseError = {
  status: number
  error: string
}

export async function fetchData<T>(
  pathName: PathName,
  options: RequestInit = {},
): Promise<[ResponseError | null, T | null]> {
  const url = `${process.env.API_URL}${pathName}`

  const requestOptions = {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  }

  const response = await fetch(url, requestOptions)

  if (!response.ok) {
    const { status, statusText } = response

    return [{ status, error: statusText }, null]
  }

  const data = await response.json()

  return [null, data]
}
