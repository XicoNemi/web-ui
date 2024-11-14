import axios from 'axios';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const targetUrl = `http://5.183.9.47:11111${url.pathname}${url.search}`;
  const method = req.method;
  const headers = new Headers(req.headers);
  const body = method !== 'GET' && method !== 'HEAD' ? await req.json() : undefined;

  try {
    const response = await axios({
      url: targetUrl,
      method,
      headers: {
        ...Object.fromEntries(headers.entries()),
        'Content-Type': 'application/json',
      },
      data: body,
    });

    const res = NextResponse.json(response.data);
    response.headers.forEach((value: string, key: string) => {
      res.headers.set(key, value);
    });
    return res;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
