type Props = { overview: string };

export default function Overview({ overview }: Props) {
  return (
    <div className="my-6 max-lg:text-center">
      <h2 className="mb-2 text-lg max-lg:text-2xl max-lg:mb-3">Overview</h2>
      <p className="text-gray-400 text-[0.9rem]">{overview}</p>
    </div>
  );
}
