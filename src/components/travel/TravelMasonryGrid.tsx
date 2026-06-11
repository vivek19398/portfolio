import type { TravelMedia } from '../../types/travel'
import TravelMediaCard from './TravelMediaCard'

/** CSS-columns masonry — no JS layout, naturally responsive. */
export default function TravelMasonryGrid({
  media,
  onOpen,
}: {
  media: TravelMedia[]
  onOpen: (index: number) => void
}) {
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
      {media.map((m, i) => (
        <TravelMediaCard key={m.id} media={m} index={i} onOpen={() => onOpen(i)} />
      ))}
    </div>
  )
}
