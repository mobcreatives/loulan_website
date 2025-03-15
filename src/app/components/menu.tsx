import { TextWithLine } from "@/components";

export default function Menu() {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 bg-[#0A1316] text-white py-10">
      <div className="space-y-3 flex flex-col items-center ">
        <TextWithLine
          text="Menu"
          className="before:w-[100%] before:h-[1px] before:-bottom-0.5"
        />
        <TextWithLine
          text="Discover Menu"
          className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[170px] before:h-[5px] before:-bottom-1"
        />
      </div>
      <div className=""></div>
    </section>
  );
}
