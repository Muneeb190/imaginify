import { Collections } from "@/components/shared/collections";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";

type SearchProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Home = async ({ searchParams }: SearchProps) => {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page) || 1;
  const searchQuery = (resolvedParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section
        className="home"
        style={{ backgroundImage: `url(/assets/images/banner-bg.png)` }}
      >
        <h1 className="home-heading mb-4">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 6).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collections
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
