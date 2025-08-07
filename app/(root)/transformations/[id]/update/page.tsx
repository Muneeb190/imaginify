
import { redirect } from "next/navigation";
import { getImageById } from "@/lib/actions/image.actions";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import { transformationTypes } from "@/constants";
import Header from "@/components/shared/header";
import TransformationForm from "@/components/shared/transformationForm";

type SearchParamProps = {
  params: { id: string; type: TransformationTypeKey };
};

const Page = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subtitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;