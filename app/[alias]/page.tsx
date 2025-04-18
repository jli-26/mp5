import { redirect } from 'next/navigation'
import getCollection from '@/db'

type AliasRedirectProps = {
  params: Promise<{ alias: string }>;
}

export default async function AliasRedirect({ params }: AliasRedirectProps) {
  const resolvedParams = await params; 
  const urlsCollection = await getCollection('urls')
  const entry = await urlsCollection.findOne({ alias: resolvedParams.alias })

  if (!entry) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Alias Not Found</h1>
        <p>The requested short URL does not exist</p>
      </div>
    )
  }

  redirect(entry.url)
}