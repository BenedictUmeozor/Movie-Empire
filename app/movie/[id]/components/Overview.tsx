type Props = { overview: string };

export default function Overview({ overview }: Props) {
  return (
    <div className="my-6 max-md:text-center">
      <h2 className="mb-2 text-lg max-md:text-2xl max-md:mb-3">Overview</h2>
      <p className="text-gray-400 text-[0.9rem]">{overview}</p>
    </div>
  );
}
