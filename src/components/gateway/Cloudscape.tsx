export default function Cloudscape({ fixed = false }: { fixed?: boolean }) {
  return <div aria-hidden="true" className={`atlas-cloudscape ${fixed ? 'atlas-cloudscape-fixed' : ''}`}>
    <div className="atlas-sun" />
    {Array.from({ length: 7 }, (_, i) => <div key={i} className={`atlas-cloud atlas-cloud-${i}`} />)}
  </div>
}
