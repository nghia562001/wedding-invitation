import { Card, CardContent } from "@/components/ui/card";

const storyItems = [
  {
    year: "2022",
    title: "Lần đầu gặp gỡ",
    desc: "Chúng tôi gặp nhau trong một ngày rất bình thường, nhưng lại mở ra một câu chuyện không hề bình thường.",
  },
  {
    year: "2023",
    title: "Những chuyến đi đầu tiên",
    desc: "Từ những buổi cà phê đến những chuyến đi xa, chúng tôi hiểu rằng mình muốn đi cùng nhau lâu hơn nữa.",
  },
  {
    year: "2026",
    title: "Lời hứa trọn đời",
    desc: "Và giờ đây, chúng tôi muốn cùng nhau bước sang một chương mới – có gia đình, có yêu thương, có bạn bè chứng kiến.",
  },
];

export function StorySection() {
  return (
    <section id="story" className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Our Story
          </p>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Câu chuyện của chúng tôi
          </h2>
          <p className="text-neutral-600">
            Một hành trình được viết nên từ những điều giản dị nhất, nhưng lại trở thành ký ức đẹp nhất.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {storyItems.map((item) => (
            <Card key={item.year} className="border-neutral-200 bg-white/90">
              <CardContent className="space-y-4 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                  {item.year}
                </p>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm leading-7 text-neutral-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}