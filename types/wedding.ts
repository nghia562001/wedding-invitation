export type StoryItem = {
  title: string;
  date: string;
  description: string;
};

export type EventItem = {
  title: string;
  time: string;
  date: string;
  venue: string;
  address: string;
  mapUrl: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
};

export type WeddingData = {
  bride: string;
  groom: string;
  weddingDate: string;
  invitationMessage: string;
  events: EventItem[];
  story: StoryItem[];
  gallery: GalleryItem[];
  rsvpContact: {
    phone: string;
    zaloUrl?: string;
    messengerUrl?: string;
  };
};