import Image from "next/image";

type Props = {
  countries: {
    iso_3166_1: string;
    name: string;
  }[];
};

export default function ProductionCountries({ countries }: Props) {
  return (
    <div className="mt-10">
      <h3 className="mb-2 text-lg max-lg:text-xl max-lg:mb-4 max-lg:text-center">
        Production Countries
      </h3>
      <div className="flex flex-wrap gap-3">
        {countries.map((country) => (
          <div
            key={country.iso_3166_1}
            className="inline-flex items-center gap-1"
          >
            <Image
              src={`https://flagcdn.com/48x36/${country.iso_3166_1.toLowerCase()}.png`}
              alt={country.name}
              width={20}
              height={20}
              className="w-5"
            />
            <span className="text-xs">{country.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
