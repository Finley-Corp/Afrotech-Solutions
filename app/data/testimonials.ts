/**
 * Shared customer testimonials — keep homepage and /projects in sync.
 *
 * Convention (current site): named individuals with role and location.
 * If stakeholders later require anonymization for confidentiality, update
 * this file only — both surfaces consume it.
 */

export type Testimonial = {
  quote: string;
  author: string;
  /** Optional short location line for card layouts */
  location?: string;
};

export const testimonials: Testimonial[] = [
  // TODO(content): Add company logos and headshots when assets are available.
  // TODO(content): Confirm named attribution is approved for all published quotes.
  {
    quote:
      "The AquaMax submersible has been running our borehole for two years without a single fault. Our farm irrigation runs 18 hours a day — it hasn't missed a beat.",
    author: "James Mwangi, Farmer",
    location: "Nakuru, Kenya",
  },
  {
    quote:
      "Afrotech's team helped us spec the right dewatering pump for our construction site. Fast delivery and the technical support was excellent throughout the project.",
    author: "Priya Sharma, Site Engineer",
    location: "Dar es Salaam, Tanzania",
  },
  {
    quote:
      "We switched our entire municipal supply pumping station to Afrotech TurboFlow units. Energy consumption dropped 35% in the first quarter.",
    author: "David Otieno, Water Authority Director",
    location: "Kisumu, Kenya",
  },
];
