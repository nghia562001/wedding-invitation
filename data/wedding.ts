import type { WeddingData } from "@/types/wedding";

export const weddingData: WeddingData = {
  bride: "Minh Anh",
  groom: "Trung Nghĩa",
  weddingDate: "2026-12-20T11:00:00+07:00",
  invitationMessage:
    "Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng mình.",

  events: [
    {
      title: "Lễ Thành Hôn",
      time: "10:00",
      date: "20/12/2026",
      venue: "Tư Gia Nhà Gái",
      address: "123 Nguyễn Văn A, Quận 1, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com",
    },
    {
      title: "Tiệc Cưới",
      time: "18:00",
      date: "20/12/2026",
      venue: "White Palace",
      address: "194 Hoàng Văn Thụ, Phú Nhuận, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com",
    },
  ],

  story: [
    {
      title: "Lần Đầu Gặp Gỡ",
      date: "06/2021",
      description: "Chúng mình gặp nhau trong một dịp rất tình cờ nhưng đầy duyên số.",
    },
    {
      title: "Bắt Đầu Hẹn Hò",
      date: "11/2021",
      description: "Những cuộc trò chuyện dài và những lần gặp gỡ đã đưa chúng mình lại gần hơn.",
    },
    {
      title: "Lời Cầu Hôn",
      date: "01/2026",
      description: "Một khoảnh khắc giản dị nhưng là ký ức đẹp nhất trong hành trình của cả hai.",
    },
  ],

  gallery: [
    { src: "/images/DSC05994 13x18.jpg", alt: "Wedding photo 1" },
    { src: "/images/DSC05659.jpg", alt: "Wedding photo 2" },
    { src: "/images/DSC05749.jpg", alt: "Wedding photo 3" },
    { src: "/images/DSC05594.jpg", alt: "Wedding photo 4" },
  ],

  rsvpContact: {
    phone: "0901 234 567",
    zaloUrl: "https://zalo.me",
    messengerUrl: "https://m.me",
  },
};