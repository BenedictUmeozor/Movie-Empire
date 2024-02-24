import Image from "next/image";

type Props = {
  companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
};
export default function ProductionCompanies({ companies }: Props) {
  return (
    <div className="mt-10">
      <h3 className="mb-2 text-lg max-md:text-xl max-md:mb-4 max-md:text-center">
        Production Companies
      </h3>
      <div className="grid grid-cols-4 gap-4 mt-6 max-md:grid-cols-2">
        {companies.map(
          (company) =>
            company.logo_path && (
              <div key={company.id}>
                <Image
                  src={
                    company.logo_path
                      ? "https://image.tmdb.org/t/p/w500" + company.logo_path
                      : "/download.png"
                  }
                  alt={company.name}
                  width={200}
                  height={200}
                  className="max-w-full"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
