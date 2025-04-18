import getCollection, {POST_COLLECTION } from '@/db';  

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'; 
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { alias, url } = await req.json();
    if (!isValidUrl(url)) {
      return new Response(
        JSON.stringify({ error: 'You have entered an invalid URL, please enter a valid URL.' }),
      );
    }

    const urlsCollection = await getCollection(POST_COLLECTION);

    const existing = await urlsCollection.findOne({ alias });
    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Alias has already been taken! Please try another one.' })
      );
    }

    await urlsCollection.insertOne({ alias, url });

    return new Response(
      JSON.stringify({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${alias}` })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error processing request:', error.message);  
    } else {
      console.error('Unexpected error:', error); 
    }
    
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again' })
    );
  }
}
