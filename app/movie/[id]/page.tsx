export default function Page({ params }: { params: { id: string } }) {
    return <div className="">Movie: {params.id}</div>
  }