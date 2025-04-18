import { redirect } from 'next/navigation'
import getCollection from '@/db'

export default async function AliasRedirect({
  params
}: {
  params: { alias: string }
}) {
  const urlsCollection = await getCollection('urls')
  const entry = await urlsCollection.findOne({ alias: params.alias })

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
